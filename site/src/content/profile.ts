import type { Lang } from "@/lib/i18n";

type ProfileText = {
  /** La prima riga, più grande: il saluto */
  greeting: string;
  /** Il racconto, un paragrafo per voce */
  bio: string[];
  /** L'ultima frase, seguita dall'email come link */
  contactLead: string;
  /** Le foto di backstage mentre lavora: titolo, testo e un alt per ogni foto di `workPhotos` */
  atWork: { title: string; text: string; alts: string[] };
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
 * Le foto di backstage, mentre Giulia lavora: nome del file in assets/img senza estensione.
 * `null` è un segnaposto (il riquadro grigio con le diagonali): per mettere una foto, salvarla
 * in assets/img e scrivere qui il nome del file al posto di `null`. Le versioni per il web le
 * genera `npm run images`, che parte da solo con `npm run dev` e `npm run build`.
 * Il testo alternativo sta nella stessa posizione di `atWork.alts`, per lingua.
 */
export const workPhotos: (string | null)[] = [null, null, null, null];

/**
 * Le polaroid dell'anno in California, stampate dall'istantanea una dopo l'altra: nome del file
 * in assets/img senza estensione. Il testo alternativo è per lingua, in `polaroidAlts`.
 * VUOTO finché Giulia non le manda: l'istantanea stampa delle scene di prova
 */
export const polaroids: string[] = [];
export const polaroidAlts: Record<Lang, string[]> = { it: [], en: [] };

// I dati vengono dal CV (Giulia_Scognamiglio_CV_EN.pdf), riscritti in modo discorsivo invece
// che come elenco. Nell'esperienza c'è solo OMEN srl, su richiesta di Giulia (fuori freelance
// e Idesiervo). Tolto Cinema 4D dagli strumenti, su richiesta di Giulia.
// Saluto e racconto (`greeting`, `bio`, `contactLead`) sono il testo di Giulia di novembre
// 2026, IT ed EN; il resto, compreso il testo degli interessi, è BOZZA da rileggere.
export const profile: Record<Lang, ProfileText> = {
  it: {
    greeting: "Ciao, sono Giulia.",
    // Testo di Giulia (novembre 2026)
    bio: [
      "Lavoro come social media content creator in agenzia: penso, scrivo e monto contenuti video, soprattutto reel, per brand di settori diversi, dalla mobilità al noleggio.",
      "Il mio lavoro parte da un’idea e arriva fino al montaggio finale. In mezzo ci sono lo script, la struttura, il ritmo, le parole giuste nei primi tre secondi. Mi piace trovare il modo più semplice e diretto per far arrivare un messaggio, anche quando il prodotto non è il più glamour del mondo.",
      "Mi sono formata in Art Direction e Graphic Design all’AANT, l’Accademia di Arte e Nuove Tecnologie di Roma, dove ho iniziato a lavorare su brand, campagne e identità visive. Alcuni di quei progetti li trovi qui. I lavori realizzati in agenzia appartengono ai clienti e non posso pubblicarli, ma posso raccontarli volentieri a voce.",
      "Sto cercando nuove sfide in agenzia, dove poter crescere su strategia, concept e scrittura creativa.",
    ],
    contactLead: "Se pensi che possiamo lavorare insieme, scrivimi:",
    atWork: {
      title: "Dietro le quinte",
      text: "Qualche momento mentre lavoro: sul set, al montaggio, davanti a uno script.",
      // Da scrivere quando arrivano le foto: una descrizione per foto, nello stesso ordine
      alts: ["", "", "", ""],
    },
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
    greeting: "Hi, I’m Giulia.",
    bio: [
      "I work as a social media content creator at an agency, where I come up with, write and edit video content, mostly reels, for brands across different industries, from mobility to rentals.",
      "My work goes from the first idea to the final cut. In between there’s the script, the structure, the pacing, and finding the right words for the first three seconds. I love finding the simplest, most direct way to get a message across, even when the product isn’t the most glamorous one out there.",
      "I studied Art Direction and Graphic Design at AANT, the Academy of Art and New Technologies in Rome, where I started working on brands, campaigns and visual identities. You’ll find some of those projects here. The work I’ve done at the agency belongs to its clients and can’t be published, but I’m happy to talk about it in person.",
      "I’m looking for new challenges in an agency where I can grow in strategy, concept development and creative writing.",
    ],
    contactLead: "If you think we could work together, get in touch:",
    atWork: {
      title: "Behind the scenes",
      text: "A few moments while I work: on set, in the edit, in front of a script.",
      alts: ["", "", "", ""],
    },
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
