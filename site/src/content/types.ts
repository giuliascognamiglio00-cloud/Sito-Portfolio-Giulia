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
  /**
   * Altre coppie dopo la prima. Con più coppie accanto al confronto c'è l'elenco per
   * sceglierle, e il divisore resta dov'è passando dall'una all'altra
   */
  more?: { before: string; after: string }[];
  /** Con "phone" il riquadro è uno schermo di telefono verticale invece del 16:9 */
  frame?: "phone";
};

export type ProjectCompareText = {
  title: string;
  caption?: string;
  /** Le etichette sui due lati; senza, "Prima" e "Dopo" */
  beforeLabel?: string;
  afterLabel?: string;
  /** Il nome della prima coppia, nell'elenco: serve solo se ci sono altre coppie */
  label?: string;
  beforeAlt: string;
  afterAlt: string;
  /** Nome e testi alternativi delle coppie di `more`, nello stesso ordine */
  more?: { label: string; beforeAlt: string; afterAlt: string }[];
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
/**
 * Un riquadro del mosaico, su tre colonne: `cols` e `rows` dicono quante ne occupa (1 o 2).
 * Con `artwork` il riquadro è un mockup, e al clic si apre l'opera piatta invece del mockup
 */
export type CaseTile = { key?: string; cols?: 1 | 2; rows?: 1 | 2; artwork?: string };

/** L'etichetta di un riquadro; `alt` serve solo se c'è l'immagine, `artworkAlt` se c'è l'opera */
export type CaseTileText = { label: string; alt?: string; artworkAlt?: string };

export type ProjectCase = {
  moodboard?: string;
  /**
   * Altre tavole nello stesso riquadro della moodboard, dopo di lei: si raggiungono con un
   * pulsante. In Oculus è la tavola del making-of
   */
  moodboardMore?: string[];
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
  outputGroups?: {
    columns?: 2 | 3 | 4;
    tiles: CaseTile[];
    /**
     * Foto verticali (4:5) in un carosello da scorrere, sopra al mosaico del gruppo e senza
     * riquadro attorno. Facoltativo
     */
    carousel?: string[];
    /** Con true il carosello del gruppo avanza da solo */
    autoplay?: boolean;
    /** Senza la cornice attorno al mosaico: i riquadri stanno direttamente sulla pagina */
    bare?: boolean;
    /**
     * Pagine di un sito dentro un MacBook, una per portatile: sono catture intere, lunghe, e
     * si scorrono dentro lo schermo. Facoltativo
     */
    laptops?: string[];
  }[];
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
  /** Foto del backstage, quadrate, in una galleria a scorrimento orizzontale dopo la moodboard */
  backstage?: string[];
  /**
   * Con "switch" gli output (il mosaico unico) si vedono uno alla volta: il primo in grande,
   * gli altri come miniature a sinistra da scegliere
   */
  outputLayout?: "switch";
  /**
   * Con "narrow" i mosaici degli output sono più stretti della pagina: per le immagini che a
   * tutta larghezza non reggono la risoluzione
   */
  outputWidth?: "narrow";
  /**
   * Tentacoli (PNG trasparenti) che entrano dai bordi e si muovono piano: `at` dice dove,
   * "title" a sinistra tra intestazione e brief, "tools" a destra sopra gli strumenti
   */
  tentacles?: { key: string; at: "title" | "tools" }[];
  /** Indirizzo del prototipo navigabile (per esempio Figma): in fondo diventa un pulsante */
  prototype?: string;
};

/**
 * Una sezione di racconto del mastro: titolo, paragrafi (una voce `{ quote }` diventa una
 * citazione in evidenza, come l'insight) ed eventualmente delle schede, per esempio le
 * persone della ricerca. `at` dice dove sta: "intro" dopo Brief e Strumenti, "wireframes"
 * prima dei wireframe, "output" prima degli output, "end" in fondo alla pagina
 */
export type StorySection = {
  at: "intro" | "wireframes" | "output" | "end";
  title: string;
  blocks: (string | { quote: string })[];
  cards?: { title: string; meta?: string; text: string }[];
};

export type ProjectCaseText = {
  /** Il racconto del progetto, in sezioni, nell'ordine in cui compaiono. Facoltativo */
  story?: StorySection[];
  /** Un'etichetta per riquadro, nello stesso ordine di `identity`, `wireframes` e `output` */
  identity?: CaseTileText[];
  wireframes?: CaseTileText[];
  output: CaseTileText[];
  /**
   * Testi dei gruppi di output, nello stesso ordine di `outputGroups`: titolo, racconto (un
   * a capo \n separa i paragrafi) ed etichette dei riquadri
   */
  outputGroups?: {
    title: string;
    text: string;
    tiles: CaseTileText[];
    /** Testo alternativo e didascalia delle foto del carosello, nello stesso ordine */
    carousel?: { caption?: string; alt: string }[];
    /** Etichetta e testo alternativo delle pagine nei MacBook, nello stesso ordine */
    laptops?: CaseTileText[];
  }[];
  /** Titolo, testo e un'etichetta per telefono, nello stesso ordine di `phones` */
  phones?: { title: string; text?: string; items: CaseTileText[] };
  moodboardAlt?: string;
  /** Nome e testo alternativo delle tavole di `moodboardMore`, nello stesso ordine */
  moodboardMore?: { label: string; alt: string }[];
  closingAlt?: string;
  /** Titolo della galleria del backstage e, per ogni foto, testo breve e testo alternativo */
  backstage?: { title: string; text?: string; items: { caption?: string; alt: string }[] };
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
