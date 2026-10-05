import type { Lang } from "@/lib/i18n";

export type Category = "works" | "academy";

/**
 * Macroarea di un progetto, mostrata come etichetta nella pagina progetto.
 * Per aggiungerne una: nuovo valore qui e una voce `areas` nei dizionari IT ed EN.
 */
export type Area =
  | "branding"
  | "art-direction"
  | "campaign"
  | "social"
  | "ui-ux"
  | "photo"
  | "compositing";

/** Un'immagine della galleria. Titolo, didascalia e testo alternativo sono per lingua. */
export type ProjectImage = {
  /** Nome del file in assets/img, senza estensione (es. "rikka_2") */
  key: string;
  /** Se true occupa mezza colonna, altrimenti tutta la larghezza */
  half?: boolean;
};

/** Confronto prima/dopo: due immagini sovrapposte con una barra trascinabile. */
export type ProjectCompare = {
  /** Nome del file dell'immagine che si vede a sinistra del divisore */
  before: string;
  /** Nome del file dell'immagine che si vede a destra */
  after: string;
};

export type ProjectCompareText = {
  title: string;
  caption?: string;
  beforeAlt: string;
  afterAlt: string;
};

/**
 * Una sezione raccontata prima del carosello. In Syntonia sono il rebranding e i poster.
 * "stagger" mette le immagini sfalsate con la descrizione di fianco; "grid" le affianca in
 * una griglia a due colonne, con la didascalia sotto.
 */
export type ProjectSection = {
  /**
   * Una voce per riquadro, nello stesso ordine dei testi. Un nome di file solo; più nomi, e
   * il riquadro diventa un piccolo carosello da sfogliare; oppure una coppia mockup e
   * artwork, e allora cliccando il mockup l'artwork si apre a schermo intero.
   */
  images: (string | string[] | { mockup: string; artwork: string })[];
  layout?: "stagger" | "grid";
  /** Solo con "grid": il primo riquadro occupa tutta la larghezza, come apertura */
  lead?: boolean;
};

export type ProjectSectionText = {
  title: string;
  /** `alt` segue la forma di `images`: un testo solo, o uno per ogni immagine del carosello */
  items: { title: string; caption: string; alt: string | string[] }[];
};

/** Un riquadro di una sezione, con le immagini già unite ai loro testi */
export type SectionItem = {
  images: { key: string; alt: string }[];
  /** Se c'è, la prima immagine è un mockup e questa è l'opera che il clic mostra intera */
  artwork?: { key: string; alt: string };
  title?: string;
  caption?: string;
};

/** Video di presentazione, al posto della griglia di immagini sotto al carosello. */
export type ProjectVideo = {
  /** Nome del file in public/video, senza estensione */
  src: string;
  /** Nome dell'immagine di copertina in assets/img, senza estensione */
  poster: string;
};

/**
 * Contenuti del layout "case", quello del wireframe definitivo: moodboard, mosaico degli
 * output e immagine di chiusura. Senza nome di file un riquadro mostra un segnaposto.
 */
/** Un riquadro del mosaico, su tre colonne: `cols` e `rows` dicono quante ne occupa (1 o 2) */
export type CaseTile = { key?: string; cols?: 1 | 2; rows?: 1 | 2 };

/** L'etichetta di un riquadro; `alt` serve solo se c'è l'immagine */
export type CaseTileText = { label: string; alt?: string };

export type ProjectCase = {
  moodboard?: string;
  /** Identità visiva (marchio, logo, palette), dopo la moodboard. Facoltativa */
  identity?: CaseTile[];
  /** Wireframe, in una sezione loro prima degli output. Facoltativi */
  wireframes?: CaseTile[];
  /** Gli output in un mosaico unico. Vuoto se si usano i gruppi */
  output: CaseTile[];
  /**
   * In alternativa: gli output divisi in gruppi, nell'ordine del racconto (per esempio un
   * gruppo per canale della campagna), ognuno col suo testo e il suo mosaico. `columns`
   * dice su quante colonne sta il mosaico del gruppo: 3 se non indicato
   */
  outputGroups?: { columns?: 2 | 3 | 4; tiles: CaseTile[] }[];
  /**
   * Stories di Instagram dentro un telefono, in fila sotto gli output. `key` è l'immagine
   * (o il primo fotogramma), `gif` una GIF animata in public/anim, senza estensione
   */
  phones?: { key: string; gif?: string }[];
  /** Illustrazioni (PNG trasparenti) che galleggiano ai lati della pagina, al massimo 8 */
  floaters?: string[];
  /**
   * Adesivi "attaccati" alla grafica della pagina, sull'angolo di una sezione: `at` dice
   * quale. Sono decorazione, come gli elementi fluttuanti
   */
  stickers?: { key: string; at: "brief" | "moodboard" | "output" | "phones" }[];
  /** Immagine finale a piena larghezza */
  closing?: string;
};

export type ProjectCaseText = {
  /** Un'etichetta per riquadro, nello stesso ordine di `identity`, `wireframes` e `output` */
  identity?: CaseTileText[];
  wireframes?: CaseTileText[];
  output: CaseTileText[];
  /**
   * Testi dei gruppi di output, nello stesso ordine di `outputGroups`: titolo, racconto (un
   * a capo \n separa i paragrafi) ed etichette dei riquadri
   */
  outputGroups?: { title: string; text: string; tiles: CaseTileText[] }[];
  /** Titolo, testo e un'etichetta per telefono, nello stesso ordine di `phones` */
  phones?: { title: string; text?: string; items: CaseTileText[] };
  moodboardAlt?: string;
  closingAlt?: string;
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
  /** Una frase sotto il titolo, nel layout "case" */
  subtitle?: string;
  /** Tipo di lavoro, es. "Campagna integrata" */
  kind: string;
  /** Cosa ho realizzato */
  made: string;
  tools: string;
  intro: string;
  insight?: string;
  concept?: string;
  /** Testi del confronto prima/dopo, se il progetto ne ha uno */
  compare?: ProjectCompareText;
  /** Titolo e didascalia del video, se il progetto ne ha uno */
  video?: { title: string; caption?: string };
  /** Testi delle sezioni raccontate, nello stesso ordine di `sections` */
  sections?: ProjectSectionText[];
  /** Testi del layout "case" */
  case?: ProjectCaseText;
  coverAlt: string;
  /** Un elemento per ogni immagine di `images`, nello stesso ordine */
  images: ProjectImageText[];
};

export type Project = {
  slug: string;
  category: Category;
  /** Macroaree del lavoro, nell'ordine in cui compaiono come etichette */
  areas: Area[];
  /** Data del progetto (AAAA-MM), usata per l'ordine cronologico */
  date: string;
  /** Colore d'accento della pagina progetto */
  accent: string;
  /** Nome del file della copertina in assets/img, senza estensione */
  cover: string;
  /**
   * Immagine di sfondo dietro il testo di presentazione (intro). Stessa proporzione in ogni
   * pagina progetto; il testo è sempre chiaro su uno scrim scuro, quindi funziona anche con
   * un'immagine chiara.
   */
  introImage: string;
  /** Confronto prima/dopo, mostrato prima del carosello. Facoltativo */
  compare?: ProjectCompare;
  /**
   * Come mostrare le immagini. Senza questo campo: carosello più griglia. Con "stagger":
   * una sotto l'altra, sfalsate, con titolo e didascalia di lato.
   */
  gallery?: "stagger";
  /** Con "end" il carosello va in fondo alla pagina invece che sopra le immagini */
  carousel?: "end";
  /** Sezioni raccontate prima del carosello, nell'ordine in cui compaiono */
  sections?: ProjectSection[];
  /** Se c'è, prende il posto della griglia di immagini sotto al carosello */
  video?: ProjectVideo;
  /**
   * Indice della sezione dopo la quale mostrare il video, per staccarlo dal fondo pagina.
   * Senza questo campo il video resta sotto al carosello.
   */
  videoAfter?: number;
  /**
   * Con "case" la pagina segue il wireframe definitivo (intestazione, Brief/Concept/Tools,
   * moodboard, output, chiusura) e usa `case` al posto di carosello, sezioni e galleria.
   */
  layout?: "case";
  case?: ProjectCase;
  /** Colore del titolo nell'intestazione del layout "case". Senza, il titolo è bianco */
  titleColor?: string;
  images: ProjectImage[];
  content: Record<Lang, ProjectText>;
};
