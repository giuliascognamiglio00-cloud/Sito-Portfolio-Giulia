import { it } from "@/content/dictionaries/it";
import { en } from "@/content/dictionaries/en";
import type { Dictionary } from "@/content/dictionaries/it";

export const LANGS = ["it", "en"] as const;

export type Lang = (typeof LANGS)[number];

/** Lingua usata quando il browser non ne chiede una che conosciamo. */
export const DEFAULT_LANG: Lang = "it";

/** Etichetta mostrata nel selettore di lingua. */
export const LANG_LABELS: Record<Lang, string> = { it: "IT", en: "EN" };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

const dictionaries = { it, en };

/** L'italiano fa da riferimento per la forma dei dizionari. */
export type { Dictionary } from "@/content/dictionaries/it";

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/**
 * Sostituisce il codice lingua all'inizio di un percorso, mantenendo il resto.
 * Serve al selettore di lingua per restare sulla stessa pagina.
 */
export function swapLang(pathname: string, lang: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLang(segments[0])) {
    segments[0] = lang;
  } else {
    segments.unshift(lang);
  }
  return `/${segments.join("/")}/`;
}
