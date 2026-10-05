import type { Project } from "../types";

export const rikka: Project = {
  slug: "rikka",
  category: "academy",
  areas: ["campaign", "art-direction", "social"],
  date: "2024-06",
  accent: "#EE4C95",
  cover: "rikka_thumb",
  // Peperoncini rossi a tutto campo (Sito/RIKKA/Rikka sfondo peperoncini.png): lo scrim
  // scuro dell'intestazione fa leggere il titolo bianco
  introImage: "rikka_hero",
  // Mastro 1 delle pagine progetto, completato con i materiali in Sito/RIKKA/: il brief
  // (dal PDF del docente e dal testo di Giulia), gli sticker, le stories in stop motion e
  // «Kikke in cucina», le illustrazioni che galleggiano ai lati, la moodboard
  layout: "case",
  case: {
    // La moodboard di Giulia: Sito/RIKKA/Moodboard Rikka – busta di plastica@2x.png
    moodboard: "rikka_moodboard",
    // Output divisi per canale, come in The Last of Us. Il content creator è stato tolto
    output: [],
    outputGroups: [
      // Affissione e stampa: la pensilina e i tre manifesti, affiancati alla stessa altezza
      { columns: 2, tiles: [{ key: "rikka_1" }, { key: "rikka_2" }] },
      // Social: il profilo e le storie
      { columns: 2, tiles: [{ key: "rikka_3" }, { key: "rikka_4" }] },
      { columns: 2, tiles: [{ key: "rikka_6", cols: 2, rows: 2 }] },
    ],
    // Gli sticker non sono nel mosaico: sono attaccati alla grafica della pagina
    // Un adesivo solo, accanto al titolo delle stories
    stickers: [{ key: "rikka_sticker_arancio", at: "phones" }],
    // Lo stop motion è una GIF (public/anim), con il primo fotogramma come immagine ferma
    phones: [
      { key: "rikka_stopmotion", gif: "rikka-stop-motion" },
      { key: "rikka_kikke_1" },
      { key: "rikka_kikke_2" },
    ],
    floaters: [
      "rikka_float_stella_rosa",
      "rikka_float_peperoncino_verde",
      "rikka_float_mano_blu",
      "rikka_float_stella_arancio",
      "rikka_float_peperoncino_rosa",
      "rikka_float_mano_verde",
      "rikka_float_stella_blu",
      "rikka_float_peperoncino_arancio",
    ],
  },
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
      // BOZZA da rileggere
      subtitle: "Il peperoncino porta fortuna: Rikka salva i piatti quando in cucina va tutto storto.",
      kind: "Campagna integrata",
      made: "Affissione, stampa, social, content creator, merchandising",
      tools: "Photoshop",
      intro:
        "Rikka Peppers è un giovane marchio italiano di peperoncini e salse spalmabili, nato da un imprenditore che dopo anni in Asia ha portato in Italia la cultura delle salse piccanti. L’obiettivo della campagna è aumentare la visibilità di Rikka e farla conoscere a un pubblico più ampio, su piattaforme tradizionali e digitali. La sfida: da noi il peperoncino non è mai protagonista, serve un modo nuovo di vederlo in cucina.",
      insight: "Nella cultura popolare il peperoncino è il portafortuna per eccellenza.",
      concept: "Rikka porta fortuna ai tuoi piatti.",
      case: {
        moodboardAlt:
          "Moodboard di Rikka dentro una busta di plastica: peperoncini rossi con il logo, i barattoli delle salse su fondi colorati, la palette con i codici dei cinque colori e la scritta «It’s hot and I like it!»",
        // BOZZA da rileggere: i testi dei gruppi, ricavati dalle didascalie
        output: [],
        outputGroups: [
          {
            title: "Affissione e stampa",
            text: "La campagna presenta Rikka come un amuleto salva-piatti: quando in cucina tutto va storto, ci pensa lei. «Perché Rikka porta bene» sulle pensiline e sui manifesti, con piatti salvati all’ultimo momento.",
            tiles: [
              {
                label: "Affissione",
                alt: "Affissione in una pensilina con un piatto sospeso sopra i fornelli e la scritta «Perché Rikka porta bene»",
              },
              {
                label: "Stampa",
                alt: "Tre manifesti con piatti serviti in cucina e il titolo «Perché Rikka porta bene»",
              },
            ],
          },
          {
            title: "Social",
            text: "Sui social il tono è informale, fatto di modi di dire sulla fortuna; nelle storie i piccoli disastri in cucina diventano un’occasione per riderci su.",
            tiles: [
              {
                label: "Social",
                alt: "Profilo Instagram di Rikka Peppers con tre post grafici su fondi colorati",
              },
              {
                label: "Storie",
                alt: "Due serie di storie Instagram, una su fondo azzurro e una su fondo rosa, con piatti e frasi ironiche",
              },
            ],
          },
          {
            title: "Merchandising",
            text: "Shopper, spille, t-shirt e grembiuli portano le illustrazioni di Rikka fuori dalla cucina.",
            tiles: [
              {
                label: "Merchandising",
                alt: "Merchandising Rikka su fondo azzurro: shopper, spille, t-shirt e grembiuli colorati",
              },
            ],
          },
        ],
        // BOZZA da rileggere: il testo delle stories
        phones: {
          title: "Instagram stories",
          text: "Le stories in stop motion giocano con i piccoli disastri in cucina: un nigiri sfatto non è un errore, è una mini poke. «Kikke in cucina» è la rubrica dei consigli pratici, con lo stesso tono.",
          items: [
            {
              label: "Stop motion",
              alt: "Storia animata in tre fotogrammi su fondo verde: «Non è un nigiri sfatto», «Non è un nigiri», «Ma una mini poke», con il sushi tra le bacchette",
            },
            {
              label: "Kikke in cucina · 1",
              alt: "Storia «Acqua di cottura» su fondo blu: dei maccheroni e il consiglio di tenere da parte un bicchiere d’acqua di cottura",
            },
            {
              label: "Kikke in cucina · 2",
              alt: "Storia «Salare la pasta» su fondo verde: dei maccheroni e la dose di sale, 7 grammi ogni 100 di pasta",
            },
          ],
        },
      },
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
      subtitle: "Chili peppers bring luck: Rikka saves your dishes when everything goes wrong in the kitchen.",
      kind: "Integrated campaign",
      made: "Out-of-home, print, social, content creator, merchandising",
      tools: "Photoshop",
      intro:
        "Rikka Peppers is a young Italian brand of chili peppers and spreadable sauces, founded by an entrepreneur who brought the culture of hot sauces back to Italy after years in Asia. The campaign aims to raise Rikka’s visibility and introduce it to a wider audience, across traditional and digital platforms. The challenge: in Italy chili is never the star, so it needs a new place in the kitchen.",
      insight: "In popular culture, the chili pepper is the lucky charm par excellence.",
      concept: "Rikka brings luck to your dishes.",
      case: {
        moodboardAlt:
          "Rikka moodboard inside a plastic sleeve: red chili peppers with the logo, sauce jars on coloured backgrounds, the palette with the codes of its five colours and the line “It’s hot and I like it!”",
        // BOZZA da rileggere: i testi dei gruppi, ricavati dalle didascalie
        output: [],
        outputGroups: [
          {
            title: "Out-of-home and print",
            text: "The campaign presents Rikka as a dish-saving charm: when everything goes wrong in the kitchen, Rikka steps in. “Why Rikka brings good luck” on bus shelters and posters, with dishes saved at the last second.",
            tiles: [
              {
                label: "Out-of-home",
                alt: "A bus-shelter poster with a dish hovering above the stove and the line “Why Rikka brings good luck”",
              },
              {
                label: "Print",
                alt: "Three posters showing dishes served in a kitchen, with the headline “Why Rikka brings good luck”",
              },
            ],
          },
          {
            title: "Social",
            text: "On social the tone is informal, built on idioms about luck; in the stories, small kitchen disasters become something to laugh about.",
            tiles: [
              {
                label: "Social",
                alt: "Rikka Peppers Instagram profile with three graphic posts on colored backgrounds",
              },
              {
                label: "Stories",
                alt: "Two series of Instagram stories, one on a light-blue background and one on pink, with dishes and ironic lines",
              },
            ],
          },
          {
            title: "Merchandising",
            text: "Tote bags, pins, t-shirts and aprons take Rikka’s illustrations out of the kitchen.",
            tiles: [
              {
                label: "Merchandising",
                alt: "Rikka merchandising on a light-blue background: tote bags, pins, t-shirts and colorful aprons",
              },
            ],
          },
        ],
        phones: {
          title: "Instagram stories",
          text: "The stop-motion stories play with small kitchen disasters: a broken nigiri isn’t a mistake, it’s a mini poke. “Kikke in cucina” is the series of practical kitchen tips, in the same tone.",
          items: [
            {
              label: "Stop motion",
              alt: "Animated story in three frames on green: “Not a broken nigiri”, “Not a nigiri”, “But a mini poke”, with sushi between chopsticks",
            },
            {
              label: "Kikke in cucina · 1",
              alt: "“Acqua di cottura” story on blue: macaroni and the tip to save a glass of pasta water",
            },
            {
              label: "Kikke in cucina · 2",
              alt: "“Salare la pasta” story on green: macaroni and the right amount of salt, 7 grams per 100 of pasta",
            },
          ],
        },
      },
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
