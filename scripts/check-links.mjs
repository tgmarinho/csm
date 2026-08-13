#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const PUBLIC_DIR = "public";
const HOST = "127.0.0.1";
const READY_TIMEOUT_MS = 15_000;

const commandFor = (name) => (process.platform === "win32" ? `${name}.cmd` : name);

const getOpenPort = async () =>
  new Promise((resolve, reject) => {
    const server = createServer();
    server.on("error", reject);
    server.listen(0, HOST, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close(() => {
        if (port) resolve(port);
        else reject(new Error("Could not allocate a local port."));
      });
    });
  });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async (url, child) => {
  const startedAt = Date.now();
  while (Date.now() - startedAt < READY_TIMEOUT_MS) {
    if (child.exitCode !== null) {
      throw new Error(`Local static server exited early with code ${child.exitCode}.`);
    }

    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch {
      // Keep polling until the server is ready or timeout expires.
    }

    await sleep(250);
  }

  throw new Error(`Timed out waiting for ${url}.`);
};

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(commandFor(command), args, {
      env: { ...process.env, NO_COLOR: "1" },
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}.`));
    });
  });

const stopServer = async (child) => {
  if (child.exitCode !== null) return;

  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    sleep(2_000).then(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    })
  ]);
};

const port = await getOpenPort();
const rootUrl = `http://${HOST}:${port}/`;
const server = spawn(commandFor("serve"), [PUBLIC_DIR, "-l", String(port)], {
  env: { ...process.env, NO_COLOR: "1" },
  stdio: ["ignore", "ignore", "inherit"]
});

try {
  await waitForServer(rootUrl, server);
  await run("linkinator", [
    rootUrl,
    "--recurse",
    "--check-css",
    "--check-fragments",
    "--timeout",
    "15000",
    "--verbosity",
    "error",
    "--skip",
    "^mailto:",
    "--skip",
    "^tel:",
    "--skip",
    "^http://127\\.0\\.0\\.1:[0-9]+/(blog|en|en/blog)$",
    "--skip",
    "^https?://(?!(127\\.0\\.0\\.1|localhost)(:|/))"
  ]);
} finally {
  await stopServer(server);
}
