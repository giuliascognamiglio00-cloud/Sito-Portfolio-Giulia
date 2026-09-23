import type { Project } from "../types";

// Ricavato dal portfolio 2023 (pagine 3-5): le tavole sono quelle originali estratte dal PDF
// e il testo di presentazione è quello che Giulia aveva già scritto.
// DA CONFERMARE: `date`, `tools` e `areas`.
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
  images: [{ key: "doggo_1" }, { key: "doggo_2" }, { key: "doggo_3" }],
  content: {
    it: {
      title: "Doggo",
      kind: "App mobile",
      made: "Flussi, interfaccia, prototipo",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Progettazione di un’applicazione per gli amanti degli amici a quattro zampe. L’obiettivo è dare un’esperienza a 360° per trovare, visitare ed eventualmente prenotare luoghi esclusivamente dog e pet friendly.",
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
      kind: "Mobile app",
      made: "Flows, interface, prototype",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "An app designed for people who love their four-legged friends. The goal is a complete experience for finding, visiting and booking places that are strictly dog and pet friendly.",
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
