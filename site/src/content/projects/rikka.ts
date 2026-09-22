import type { Project } from "../types";

export const rikka: Project = {
  slug: "rikka",
  category: "academy",
  areas: ["campaign", "art-direction", "social"],
  date: "2024-06",
  accent: "#EE4C95",
  cover: "rikka_thumb",
  // Scena notturna alla pensilina: gran parte del cielo scuro regge bene il testo chiaro sopra
  introImage: "rikka_1",
  images: [
    { key: "rikka_2" },
    { key: "rikka_1" },
    { key: "rikka_3", half: true },
    { key: "rikka_4", half: true },
    { key: "rikka_5", half: true },
    { key: "rikka_6", half: true },
  ],
  content: {
    it: {
      title: "Rikka Peppers",
      kind: "Campagna integrata",
      made: "Affissione, stampa, social, content creator, merchandising",
      tools: "Photoshop",
      intro:
        "Campagna integrata per Rikka Peppers, giovane azienda italiana di peperoncini e salse spalmabili. La campagna stampa presenta Rikka come un amuleto salva-piatti: interviene quando in cucina tutto va storto.",
      insight: "Nella cultura popolare il peperoncino è il portafortuna per eccellenza.",
      concept: "Rikka porta fortuna ai tuoi piatti.",
      coverAlt:
        "Tre manifesti con piatti serviti in cucina e il titolo «Perché Rikka porta bene»",
      images: [
        {
          title: "Stampa",
          caption: "Quando in cucina tutto va male, ci pensa Rikka.",
          alt: "Tre manifesti con piatti serviti in cucina e il titolo «Perché Rikka porta bene»",
        },
        {
          title: "Affissione",
          caption: "«Perché Rikka porta bene.»",
          alt: "Affissione in una pensilina con un piatto sospeso sopra i fornelli e la scritta «Perché Rikka porta bene»",
        },
        {
          title: "Social",
          caption: "Un tono informale, fatto di modi di dire sulla fortuna.",
          alt: "Profilo Instagram di Rikka Peppers con tre post grafici su fondi colorati",
        },
        {
          title: "Storie",
          caption: "I piccoli disastri in cucina, raccontati con ironia.",
          alt: "Due serie di storie Instagram, una su fondo azzurro e una su fondo rosa, con piatti e frasi ironiche",
        },
        {
          title: "Content creator",
          caption: "Nella foto «fluttuante» Rikka non cade mai: è troppo fortunata.",
          alt: "Un content creator in cucina con la macchina fotografica; accanto, un telefono con un barattolo e dei peperoncini che fluttuano",
        },
        {
          title: "Merchandising",
          caption: "Shopper, spille, t-shirt e grembiuli.",
          alt: "Merchandising Rikka su fondo azzurro: shopper, spille, t-shirt e grembiuli colorati",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Rikka Peppers",
      kind: "Integrated campaign",
      made: "Out-of-home, print, social, content creator, merchandising",
      tools: "Photoshop",
      intro:
        "Integrated campaign for Rikka Peppers, a young Italian company making chili peppers and spreadable sauces. The print campaign presents Rikka as a dish-saving charm: it steps in when everything goes wrong in the kitchen.",
      insight: "In popular culture, the chili pepper is the lucky charm par excellence.",
      concept: "Rikka brings luck to your dishes.",
      coverAlt:
        "Three posters showing dishes served in a kitchen, with the headline “Why Rikka brings good luck”",
      images: [
        {
          title: "Print",
          caption: "When everything goes wrong in the kitchen, Rikka has your back.",
          alt: "Three posters showing dishes served in a kitchen, with the headline “Why Rikka brings good luck”",
        },
        {
          title: "Out-of-home",
          caption: "“Why Rikka brings good luck.”",
          alt: "A bus-shelter poster with a dish hovering above the stove and the line “Why Rikka brings good luck”",
        },
        {
          title: "Social",
          caption: "An informal tone, built on idioms about luck.",
          alt: "Rikka Peppers Instagram profile with three graphic posts on colored backgrounds",
        },
        {
          title: "Stories",
          caption: "Small kitchen disasters, told with irony.",
          alt: "Two series of Instagram stories, one on a light-blue background and one on pink, with dishes and ironic lines",
        },
        {
          title: "Content creator",
          caption: "In the “floating” photo, Rikka never falls: it is just too lucky.",
          alt: "A content creator in a kitchen holding a camera; next to it, a phone showing a jar and chili peppers floating in mid-air",
        },
        {
          title: "Merchandising",
          caption: "Tote bags, pins, t-shirts and aprons.",
          alt: "Rikka merchandising on a light-blue background: tote bags, pins, t-shirts and colorful aprons",
        },
      ],
    },
  },
};
