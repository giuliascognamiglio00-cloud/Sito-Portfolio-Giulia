import type { Lang } from "./i18n";

/**
 * Costruisce un percorso interno per una lingua.
 * La barra finale è voluta: il sito è esportato con trailingSlash, quindi ogni rotta
 * è una cartella con dentro index.html.
 */
export function path(lang: Lang, ...segments: string[]): string {
  return `/${[lang, ...segments].join("/")}/`;
}

export const routes = {
  home: (lang: Lang) => path(lang),
  works: (lang: Lang) => path(lang, "works"),
  project: (lang: Lang, slug: string) => path(lang, "works", slug),
  about: (lang: Lang) => path(lang, "about"),
  contact: (lang: Lang) => path(lang, "contact"),
};

/** Indirizzi usati in più punti del sito. */
export const contacts = {
  email: "giuliascognamiglio00@gmail.com",
  behance: "https://www.behance.net/gisco",
  linkedin: "https://www.linkedin.com/in/gisco",
};
