import type { Lang } from "@/lib/i18n";

export type Category = "works" | "academy";

/** Un'immagine della galleria. Titolo, didascalia e testo alternativo sono per lingua. */
export type ProjectImage = {
  /** Nome del file in assets/img, senza estensione (es. "rikka_2") */
  key: string;
  /** Se true occupa mezza colonna, altrimenti tutta la larghezza */
  half?: boolean;
};

export type ProjectImageText = {
  /** Etichetta breve in grassetto davanti alla didascalia */
  title?: string;
  caption?: string;
  alt: string;
};

/** Tutto ciò che va tradotto. IT ed EN hanno per costruzione la stessa forma. */
export type ProjectText = {
  title: string;
  /** Tipo di lavoro, es. "Campagna integrata" */
  kind: string;
  /** Cosa ho realizzato */
  made: string;
  tools: string;
  intro: string;
  insight?: string;
  concept?: string;
  coverAlt: string;
  /** Un elemento per ogni immagine di `images`, nello stesso ordine */
  images: ProjectImageText[];
};

export type Project = {
  slug: string;
  category: Category;
  /** Data del progetto (AAAA-MM), usata per l'ordine cronologico */
  date: string;
  /** Colore d'accento della pagina progetto */
  accent: string;
  /** Nome del file della copertina in assets/img, senza estensione */
  cover: string;
  images: ProjectImage[];
  content: Record<Lang, ProjectText>;
};
