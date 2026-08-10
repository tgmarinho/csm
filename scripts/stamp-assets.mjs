#!/usr/bin/env node
// Cache-busting por hash de conteúdo, sem bundler.
//
// Os assets não têm hash no nome (landing.css, site.js), então NÃO podem ser
// servidos como `immutable` sem um mecanismo de versão: devices que já
// visitaram ficariam presos na versão antiga por até 1 ano. Este script calcula
// um hash do CONTEÚDO de cada asset e injeta `?v=<hash>` em todas as refs de
// CSS/JS nos HTMLs. Assim:
//
//   - a URL só muda quando o arquivo realmente muda (deploys que não mexem no
//     CSS/JS mantêm o cache dos visitantes recorrentes);
//   - com a URL versionada, `immutable` volta a ser seguro em `_headers`,
//     dando cache de 1 ano e visitas repetidas instantâneas, sempre corretas.
//
// Roda no build da Netlify (ver netlify.toml) e também pode ser rodado
// localmente com `npm run build`. É idempotente: rodar de novo só reescreve o
// hash se o conteúdo mudou.

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = "public";

// Assets versionáveis -> caminho real do arquivo.
const ASSETS = {
  "landing.css": join(PUBLIC_DIR, "assets/css/landing.css"),
  "links.css": join(PUBLIC_DIR, "assets/css/links.css"),
  "site.js": join(PUBLIC_DIR, "assets/js/site.js"),
  "links.js": join(PUBLIC_DIR, "assets/js/links.js")
};

const hashOf = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10);

const versions = Object.fromEntries(
  Object.entries(ASSETS).map(([name, path]) => [name, hashOf(path)])
);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Para cada asset, casa o nome do arquivo com um possível `?v=...` já existente
// e substitui pelo hash atual.
const replacers = Object.entries(versions).map(([name, hash]) => ({
  regex: new RegExp(`${escapeRegExp(name)}(\\?v=[\\w.-]*)?`, "g"),
  replacement: `${name}?v=${hash}`
}));

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
};
walk(PUBLIC_DIR);

let changed = 0;
for (const file of htmlFiles) {
  const original = readFileSync(file, "utf8");
  let updated = original;
  for (const { regex, replacement } of replacers) {
    updated = updated.replace(regex, replacement);
  }
  if (updated !== original) {
    writeFileSync(file, updated);
    changed += 1;
  }
}

const summary = Object.entries(versions)
  .map(([name, hash]) => `${name}=${hash}`)
  .join(", ");
console.log(`stamp-assets: ${summary}`);
console.log(`stamp-assets: ${changed}/${htmlFiles.length} HTML atualizados`);
