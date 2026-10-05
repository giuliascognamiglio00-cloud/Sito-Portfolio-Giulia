import type { Project } from "../types";

// Ricavato dal portfolio 2023 (pagine 3-5): le tavole sono quelle originali estratte dal PDF
// e il testo di presentazione è quello che Giulia aveva già scritto.
// DA CONFERMARE: `date`, `tools` e `areas`.
// È il primo progetto con l'impostazione del wireframe definitivo (`layout: "case"`).
// Dove manca un'immagine la pagina mostra un segnaposto: moodboard e sei riquadri degli output.
export const doggo: Project = {
  slug: "doggo",
  category: "academy",
  areas: ["ui-ux", "art-direction"],
  // Anno confermato da Giulia; il mese è ancora da precisare
  date: "2024-01",
  // L'arancione dei pulsanti dell'app
  accent: "#FE6B28",
  cover: "doggo_1",
  // La tavola dei flussi: ha ampie zone chiare e vuote, il testo sopra si legge
  introImage: "doggo_2",
  layout: "case",
  case: {
    // Senza `moodboard` compare il segnaposto
    // Stessa geometria del wireframe: tre colonne, cinque righe, nessun buco
    output: [
      { key: "doggo_2", cols: 2 },
      { rows: 2 },
      { rows: 2 },
      { rows: 2 },
      {},
      {},
      { key: "doggo_3", cols: 2 },
      { cols: 2 },
      {},
    ],
    closing: "doggo_1",
  },
  images: [{ key: "doggo_1" }, { key: "doggo_2" }, { key: "doggo_3" }],
  content: {
    it: {
      title: "Doggo",
      // BOZZA da rileggere: sottotitolo e concept
      subtitle: "Un’app per trovare, visitare e prenotare i luoghi dove i cani sono i benvenuti.",
      kind: "App mobile",
      made: "Flussi, interfaccia, prototipo",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Progettazione di un’applicazione per gli amanti degli amici a quattro zampe. L’obiettivo è dare un’esperienza a 360° per trovare, visitare ed eventualmente prenotare luoghi esclusivamente dog e pet friendly.",
      concept:
        "I cani sono i protagonisti: escono dalle schermate e danno all’app un tono ironico e riconoscibile, su un giallo caldo con i pulsanti arancioni. La navigazione invece resta essenziale, in tre gesti: cerca, prenota, esplora.",
      case: {
        output: [
          {
            label: "I flussi",
            alt: "Diagramma dei percorsi dell’app Doggo con i riquadri delle schermate collegati da frecce, accanto alle schermate della mappa e della sezione Esplora",
          },
          { label: "Onboarding" },
          { label: "Esplora" },
          { label: "Mappa" },
          { label: "Profilo" },
          { label: "Icone" },
          {
            label: "Le schermate",
            alt: "Quattro schermate dell’app Doggo: la sezione Esplora con le categorie, la mappa, il profilo utente e l’elenco dei locali più frequentati",
          },
          { label: "Logo" },
          { label: "Palette" },
        ],
        closingAlt:
          "Tre schermate di benvenuto dell’app Doggo — Cerca, Prenota, Esplora — su fondo giallo, con un bulldog con gli occhiali da sole in primo piano",
      },
      coverAlt:
        "Le schermate di benvenuto dell’app Doggo su fondo giallo, con le foto di tre cani e i pulsanti arancioni",
      images: [
        {
          title: "L’onboarding",
          caption: "Cerca, prenota, esplora: le tre schermate che accolgono chi arriva.",
          alt: "Tre schermate di benvenuto dell’app Doggo — Cerca, Prenota, Esplora — su fondo giallo, con un bulldog con gli occhiali da sole in primo piano",
        },
        {
          title: "I flussi",
          caption: "Dalla registrazione alla mappa: come ci si muove dentro l’app.",
          alt: "Diagramma dei percorsi dell’app Doggo con i riquadri delle schermate collegati da frecce, accanto alle schermate della mappa e della sezione Esplora",
        },
        {
          title: "Le schermate",
          caption: "Esplora, ricerca sulla mappa, profilo e schede dei locali.",
          alt: "Quattro schermate dell’app Doggo: la sezione Esplora con le categorie, la mappa, il profilo utente e l’elenco dei locali più frequentati",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Doggo",
      subtitle: "An app for finding, visiting and booking the places where dogs are welcome.",
      kind: "Mobile app",
      made: "Flows, interface, prototype",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "An app designed for people who love their four-legged friends. The goal is a complete experience for finding, visiting and booking places that are strictly dog and pet friendly.",
      concept:
        "The dogs are the stars: they step out of the screens and give the app a playful, recognisable tone, on a warm yellow with orange buttons. Navigation stays essential, in three moves: search, book, explore.",
      case: {
        output: [
          {
            label: "The flows",
            alt: "A flow diagram of the Doggo app with screen boxes joined by arrows, next to the map and Explore screens",
          },
          { label: "Onboarding" },
          { label: "Explore" },
          { label: "Map" },
          { label: "Profile" },
          { label: "Icons" },
          {
            label: "The screens",
            alt: "Four Doggo app screens: the Explore section with its categories, the map, the user profile and the list of most visited venues",
          },
          { label: "Logo" },
          { label: "Palette" },
        ],
        closingAlt:
          "Three Doggo welcome screens — Cerca, Prenota, Esplora — on a yellow background, with a bulldog wearing sunglasses in the foreground",
      },
      coverAlt:
        "The Doggo app welcome screens on a yellow background, with photographs of three dogs and orange buttons",
      images: [
        {
          title: "Onboarding",
          caption: "Search, book, explore: the three screens that greet you.",
          alt: "Three Doggo welcome screens — Cerca, Prenota, Esplora — on a yellow background, with a bulldog wearing sunglasses in the foreground",
        },
        {
          title: "The flows",
          caption: "From signing up to the map: how you move through the app.",
          alt: "A flow diagram of the Doggo app with screen boxes joined by arrows, next to the map and Explore screens",
        },
        {
          title: "The screens",
          caption: "Explore, map search, profile and venue cards.",
          alt: "Four Doggo app screens: the Explore section with its categories, the map, the user profile and the list of most visited venues",
        },
      ],
    },
  },
};
