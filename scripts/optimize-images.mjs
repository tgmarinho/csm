#!/usr/bin/env node
import { access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const CARLA_DIR = "public/assets/img/carla";
const ROOT_IMG_DIR = "public/assets/img";
const DEFAULT_WIDTHS = [320, 640, 960, 1200];
const EXTRA_WIDTHS_BY_BASENAME = {
  "carla-suzana-marinho-blazer-bege": [512, 1280],
  "carla-suzana-marinho-em-pe": [1280],
  "carla-suzana-marinho-retrato": [1280]
};

const mode = process.argv.includes("--write") ? "write" : "check";
const shouldWrite = mode === "write";

const fileExists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const widthsFor = (name, imageWidth) => {
  const widths = new Set([...DEFAULT_WIDTHS, ...(EXTRA_WIDTHS_BY_BASENAME[name] ?? [])]);
  return [...widths].filter((width) => width <= imageWidth).sort((a, b) => a - b);
};

const writeWebp = async (source, output, width) => {
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
};

const checkResponsivePhoto = async (source) => {
  const name = basename(source, extname(source));
  const metadata = await sharp(source).metadata();
  const widths = widthsFor(name, metadata.width ?? 0);
  const missing = [];
  const generated = [];

  for (const width of widths) {
    const output = join(CARLA_DIR, `${name}-${width}w.webp`);
    if (shouldWrite) {
      await writeWebp(source, output, width);
      generated.push(output);
    } else if (!(await fileExists(output))) {
      missing.push(output);
    }
  }

  return { generated, missing };
};

const checkLogo = async () => {
  const source = join(ROOT_IMG_DIR, "logo_psi_2.png");
  const output = join(ROOT_IMG_DIR, "logo_psi_2.webp");

  if (shouldWrite) {
    await sharp(source).webp({ quality: 90, effort: 5 }).toFile(output);
    return { generated: [output], missing: [] };
  }

  return {
    generated: [],
    missing: (await fileExists(output)) ? [] : [output]
  };
};

const entries = await readdir(CARLA_DIR);
const jpgSources = entries
  .filter((entry) => extname(entry).toLowerCase() === ".jpg")
  .map((entry) => join(CARLA_DIR, entry))
  .sort();

const results = [];
for (const source of jpgSources) {
  results.push(await checkResponsivePhoto(source));
}
results.push(await checkLogo());

const generated = results.flatMap((result) => result.generated);
const missing = results.flatMap((result) => result.missing);

if (missing.length > 0) {
  console.error("Missing optimized image files:");
  for (const file of missing) console.error(`- ${file}`);
  console.error("\nRun `npm run images:build` to generate them with Sharp.");
  process.exit(1);
}

if (shouldWrite) {
  console.log(`optimize-images: wrote ${generated.length} image files`);
} else {
  console.log(`optimize-images: ${jpgSources.length} photos and logo variants present`);
}
