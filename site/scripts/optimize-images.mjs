// Genera le varianti responsive delle immagini a build time.
// Da assets/img/<nome>.jpg (o .png) produce public/img/<nome>-<larghezza>.{avif,webp,jpg|png}
// e scrive src/content/image-manifest.json con le misure vere, usate da <Picture>.
// Non ingrandisce mai: le larghezze sono al massimo quella della sorgente.
import { mkdir, readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets", "img");
const outDir = path.join(root, "public", "img");
const manifestPath = path.join(root, "src", "content", "image-manifest.json");

const TARGET_WIDTHS = [640, 1024, 1600];

const isFresh = async (out, src) => {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
};

await mkdir(outDir, { recursive: true });

// I JPG hanno il fallback .jpg; i PNG (ritagli con sfondo trasparente) hanno il fallback .png.
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name;
  const src = path.join(srcDir, file);
  const isPng = /\.png$/i.test(file);
  const fallback = isPng ? "png" : "jpg";
  const { width, height } = await sharp(src).metadata();

  const widths = [...TARGET_WIDTHS.filter((w) => w < width), width];
  manifest[name] = { width, height, widths, fallback };

  for (const w of widths) {
    const base = path.join(outDir, `${name}-${w}`);
    const resize = () => sharp(src).resize({ width: w, withoutEnlargement: true });
    const jobs = [
      [".avif", () => resize().avif({ quality: 55, effort: 4 }).toFile(`${base}.avif`)],
      [".webp", () => resize().webp({ quality: 78 }).toFile(`${base}.webp`)],
      isPng
        ? [".png", () => resize().png({ compressionLevel: 9, palette: false }).toFile(`${base}.png`)]
        : [".jpg", () => resize().jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`)],
    ];
    for (const [ext, run] of jobs) {
      if (!(await isFresh(base + ext, src))) await run();
    }
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Immagini ottimizzate: ${files.length} sorgenti in ${outDir}`);
