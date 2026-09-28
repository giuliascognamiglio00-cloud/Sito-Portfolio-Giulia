// Controlla il sito esportato in out/ prima di pubblicarlo. Si lancia dopo il build:
//   npm run build && npm run check
// Verifica che ci siano tutte le pagine, che nessun link interno sia rotto e che niente
// superi i limiti di Cloudflare Pages o richieda un server. Esce con errore se trova problemi.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

// Limiti di Cloudflare Pages
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const MAX_FILES = 20000;

const LANGS = ["it", "en"];
const PAGES = ["", "about/", "contact/", "works/"];

const problems = [];

try {
  await stat(outDir);
} catch {
  console.error("Manca out/: lancia prima npm run build.");
  process.exit(1);
}

/** Tutti i file sotto una cartella, con percorso relativo a out/ e barre "/". */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

const rel = (full) => path.relative(outDir, full).split(path.sep).join("/");
const files = await walk(outDir);
const published = new Set(files.map(rel));

// 1. Pagine attese
const slugs = {};
for (const lang of LANGS) {
  const worksDir = path.join(outDir, lang, "works");
  slugs[lang] = (await readdir(worksDir, { withFileTypes: true }).catch(() => []))
    .filter((e) => e.isDirectory() && !e.name.startsWith("__next"))
    .map((e) => e.name)
    .sort();
}
const expectedPages = [
  "index.html",
  "404.html",
  ...LANGS.flatMap((lang) => [
    ...PAGES.map((p) => `${lang}/${p}index.html`),
    ...slugs.it.map((slug) => `${lang}/works/${slug}/index.html`),
  ]),
];
for (const page of expectedPages) {
  if (!published.has(page)) problems.push(`Pagina mancante: ${page}`);
}
if (slugs.it.join() !== slugs.en.join()) {
  problems.push(`Progetti diversi tra le lingue: it [${slugs.it}] / en [${slugs.en}]`);
}

// 2. Link interni
// React scrive "srcSet" e, nei preload, "imageSrcSet": il confronto ignora le maiuscole
const ATTR = /\s(href|src|poster|(?:image)?srcset)="([^"]*)"/gi;
const htmlFiles = files.filter((f) => f.endsWith(".html"));
let checkedRefs = 0;

/** Il file che un indirizzo interno fa servire, o null se è esterno o non va controllato. */
function target(url, fromPage) {
  if (/^(?:[a-z]+:|\/\/|#)/i.test(url) || url === "") return null;
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const base = "/" + path.posix.dirname(fromPage) + "/";
  let resolved = path.posix.normalize(clean.startsWith("/") ? clean : base + clean);
  if (resolved.endsWith("/")) resolved += "index.html";
  return resolved.slice(1);
}

for (const file of htmlFiles) {
  const page = rel(file);
  const html = await readFile(file, "utf8");
  if (/localhost|127\.0\.0\.1/.test(html)) problems.push(`${page}: contiene un indirizzo locale`);

  for (const [, attr, value] of html.matchAll(ATTR)) {
    // srcset elenca più indirizzi, ciascuno seguito dalla larghezza
    const urls = /srcset$/i.test(attr)
      ? value.split(",").map((part) => part.trim().split(/\s+/)[0])
      : [value];
    for (const url of urls) {
      const t = target(url.replaceAll("&amp;", "&"), page);
      if (t === null) continue;
      checkedRefs++;
      if (!published.has(t)) problems.push(`${page}: link rotto → ${url}`);
    }
  }
}

// 3. Niente che richieda un server, e dentro i limiti di Cloudflare
if (files.length > MAX_FILES) problems.push(`${files.length} file: il limite è ${MAX_FILES}`);
for (const file of files) {
  const { size } = await stat(file);
  if (size > MAX_FILE_BYTES) {
    problems.push(`${rel(file)}: ${(size / 1024 / 1024).toFixed(1)} MB, il limite è 25 MB`);
  }
}
for (const name of published) {
  if (/^(?:api|functions)\//.test(name) || name === "_worker.js") {
    problems.push(`${name}: codice da server in un sito statico`);
  }
}

if (problems.length) {
  console.error(`Problemi trovati in out/: ${problems.length}\n`);
  for (const p of problems) console.error(`  • ${p}`);
  process.exit(1);
}
console.log(
  `out/ è pronto: ${files.length} file, ${expectedPages.length} pagine attese presenti, ` +
    `${checkedRefs} link interni controllati in ${htmlFiles.length} pagine, nessun problema.`,
);
