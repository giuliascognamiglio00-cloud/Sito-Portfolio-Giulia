import type { Lang } from "@/lib/i18n";

type ProfileText = {
  bio: string;
  facts: { label: string; lines: string[] }[];
  portraitAlt: string;
  /** La sezione dopo il CV: gli interessi, con la fotocamera che mostra le foto di Giulia */
  interests: { title: string; text: string; tags: string[] };
  /** Sotto gli interessi: l'anno all'estero in California, con l'istantanea che stampa le polaroid */
  abroad: { title: string; text: string[] };
};

/**
 * Le foto di Giulia che si vedono sul display della fotocamera, nell'ordine: nome del file in
 * assets/img senza estensione. Il testo alternativo è per lingua, in `photoAlts`. Giordania e
 * Roma; le verticali (l'arco e l'angelo) si vedono intere, con le bande nere ai lati
 */
export const photos: string[] = [
  "foto_castello",
  "foto_wadi_rum",
  "foto_arco",
  "foto_angelo",
  "foto_roma",
];
export const photoAlts: Record<Lang, string[]> = {
  it: [
    "In bianco e nero, un castello di pietra nel deserto della Giordania sotto un cielo carico di nuvole, con un sentiero che porta all’ingresso",
    "Il deserto del Wadi Rum al tramonto: sabbia rossa, montagne di roccia e nuvole rosate",
    "Un arco di una rovina in Giordania che si apre sul cielo azzurro e su una volta di pietra crollata",
    "Un angelo di marmo di Ponte Sant’Angelo, a Roma, visto dal basso contro un cielo grigio",
    "La cupola di San Pietro oltre il Tevere e un ponte ad archi, tra i rami spogli di un albero",
  ],
  en: [
    "In black and white, a stone castle in the Jordanian desert under a heavy, cloudy sky, with a path leading to the entrance",
    "The Wadi Rum desert at sunset: red sand, rock mountains and pink clouds",
    "An arch in a ruin in Jordan opening onto blue sky and a collapsed stone vault",
    "A marble angel on Ponte Sant’Angelo in Rome, seen from below against a grey sky",
    "The dome of St Peter’s beyond the Tiber and an arched bridge, through the bare branches of a tree",
  ],
};

/**
 * Le polaroid dell'anno in California, stampate dall'istantanea una dopo l'altra: nome del file
 * in assets/img senza estensione. Il testo alternativo è per lingua, in `polaroidAlts`.
 * VUOTO finché Giulia non le manda: l'istantanea stampa delle scene di prova
 */
export const polaroids: string[] = [];
export const polaroidAlts: Record<Lang, string[]> = { it: [], en: [] };

// I dati vengono dal CV (Giulia_Scognamiglio_CV_EN.pdf), riscritti in modo discorsivo invece
// che come elenco. Nell'esperienza c'è solo OMEN srl, su richiesta di Giulia (fuori freelance
// e Idesiervo); il social media marketing è raccontato come una delle cose che fa, non come
// la sua etichetta. Tolto Cinema 4D dagli strumenti, su richiesta di Giulia.
// BOZZA da rileggere da Giulia, in italiano e in inglese, compreso il testo degli interessi.
export const profile: Record<Lang, ProfileText> = {
  it: {
    bio: "Sono art director. Mi sono formata in Art Direction e Graphic Design all’AANT, l’Accademia di Arte e Nuove Tecnologie di Roma, e lavoro su campagne integrate, brand identity e compositing, dall’idea alla realizzazione. Ogni giorno costruisco strategie e contenuti per marchi di settori diversi, seguendo tutto il percorso: analisi, concept, produzione e pubblicazione. Lavoro bene in gruppo, anche sotto scadenza, e cerco progetti nuovi che mi mettano alla prova.",
    portraitAlt: "Ritratto di Giulia Scognamiglio",
    facts: [
      {
        label: "Esperienza",
        lines: [
          "Da aprile 2025 sono in OMEN srl, dove seguo la comunicazione social di clienti B2B e B2C: parto dall’analisi di pubblico, concorrenti e tendenze, costruisco il piano editoriale e poi realizzo copy, reel, caroselli, newsletter e visual",
        ],
      },
      {
        label: "Formazione",
        lines: [
          "Art Direction e Graphic Design all’AANT di Roma, diploma nel 2025",
          "Prima ancora, il diploma in Grafica Pubblicitaria all’Istituto Carlo Urbani, nel 2020",
          "Nel 2026 un percorso con Learnn su social media strategy, brand storytelling e prompt engineering, Claude compreso",
        ],
      },
      {
        label: "Cosa so fare",
        lines: [
          "Art direction e comunicazione visiva, strategia social e piano editoriale, copywriting",
          "Penso di lato, risolvo problemi, mi adatto in fretta e so spiegare le mie idee",
        ],
      },
      {
        label: "Strumenti",
        lines: [
          "Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom e Firefly; Figma per le interfacce, Dreamweaver; Canva, Notion e ChatGPT per il lavoro di tutti i giorni",
        ],
      },
      {
        label: "Lingue",
        lines: [
          "Inglese B2/C1: nel 2018–2019 ho passato un anno di scuola in California con Intercultura, immersa nella lingua e nella cultura",
        ],
      },
    ],
    interests: {
      title: "Fuori dal lavoro",
      text: "Quando non lavoro fotografo: è il modo in cui continuo ad allenare l’occhio, cercando la luce e l’inquadratura anche dove nessuno le ha messe in scena. Dentro questa fotocamera c’è una parte di quello che scatto: girala e sfoglia le foto sul display. Il resto del tempo lo passo con gli animali, in viaggio o con le discipline aeree.",
      tags: ["Fotografia", "Animali", "Viaggi", "Discipline aeree"],
    },
    abroad: {
      title: "Un anno in California",
      text: [
        "Nel 2018–2019 ho passato un anno di scuola a Live Oak, in California, con Intercultura. Lì ho imparato l’inglese vivendolo ogni giorno, e sono entrata in contatto con persone e culture diverse dalla mia.",
        "Ho viaggiato molto: con il senior trip ho visto San Diego, e a fine anno ho vissuto l’esperienza della graduation.",
      ],
    },
  },
  en: {
    bio: "I’m an art director. I trained in Art Direction and Graphic Design at AANT, the Academy of Art and New Technologies in Rome, and I work on integrated campaigns, brand identity and compositing, from idea to execution. Every day I build strategies and content for brands across different sectors, following the whole journey: analysis, concept, production and publishing. I work well in a team, even under deadline, and I’m looking for new projects that challenge me.",
    portraitAlt: "Portrait of Giulia Scognamiglio",
    facts: [
      {
        label: "Experience",
        lines: [
          "Since April 2025 I’ve been at OMEN srl, where I look after social media communication for B2B and B2C clients: I start from audience, competitor and trend analysis, build the editorial plan, then produce copy, Reels, carousels, newsletters and visuals",
        ],
      },
      {
        label: "Education",
        lines: [
          "Art Direction and Graphic Design at AANT in Rome, graduated in 2025",
          "Before that, a diploma in Advertising Graphics from Istituto Carlo Urbani, in 2020",
          "In 2026 a Learnn course on social media strategy, brand storytelling and prompt engineering, Claude included",
        ],
      },
      {
        label: "What I do",
        lines: [
          "Art direction and visual communication, social media strategy and editorial planning, copywriting",
          "I think laterally, solve problems, adapt quickly and know how to explain my ideas",
        ],
      },
      {
        label: "Tools",
        lines: [
          "Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom and Firefly; Figma for interfaces, Dreamweaver; Canva, Notion and ChatGPT for everyday work",
        ],
      },
      {
        label: "Languages",
        lines: [
          "English B2/C1: in 2018–2019 I spent a school year in California with Intercultura, fully immersed in the language and culture",
        ],
      },
    ],
    interests: {
      title: "Beyond work",
      text: "When I’m not working, I take photos: it’s how I keep training my eye, looking for light and framing even where nobody staged them. Inside this camera is some of what I shoot: turn it around and browse the photos on the display. The rest of my time goes to animals, travel and aerial arts.",
      tags: ["Photography", "Animals", "Travel", "Aerial arts"],
    },
    abroad: {
      title: "A year in California",
      text: [
        "In 2018–2019 I spent a school year in Live Oak, California, with Intercultura. There I learned English by living it every day, and I met people and cultures very different from my own.",
        "I travelled a lot: on the senior trip I saw San Diego, and at the end of the year I got to experience graduation.",
      ],
    },
  },
};
