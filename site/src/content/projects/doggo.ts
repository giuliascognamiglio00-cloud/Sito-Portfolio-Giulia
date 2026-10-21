import type { Project } from "../types";

// Ricavato dalla presentazione d'esame di Giulia (Sito/doggo2/2B_…_InterfaceInteraction.pdf)
// e dai mockup della landing nella stessa cartella. Brief, concept e insight vengono dal PDF;
// i dati della ricerca (sondaggi, personas, card sorting) restano fuori dalla pagina, come
// ha chiesto Giulia, e compaiono solo come insight nei testi.
// Le schermate dell'app sono pagine del PDF; i mockup sono ritagliati sul dispositivo.
// DA CONFERMARE: `date`, `tools` e `areas`. Manca la moodboard: si vede il segnaposto.
export const doggo: Project = {
  slug: "doggo",
  category: "academy",
  areas: ["ui-ux", "art-direction"],
  // Anno confermato da Giulia; il mese è ancora da precisare
  date: "2024-01",
  // L'arancione dei pulsanti dell'app
  accent: "#FE6B28",
  cover: "doggo_cover",
  // La foto della copertina del PDF: cani al guinzaglio in un parco
  introImage: "doggo_hero",
  layout: "case",
  case: {
    // Tutte le immagini sono 16:9: nei riquadri 1×1 e 2×2 si vedono intere.
    // I wireframe sono pagine del PDF ritagliate sul grigio, senza le linee dei flussi;
    // Giulia ha scelto di mostrare solo Esplora, Ristoranti e Profilo
    wireframes: [
      { key: "doggo_wf_esplora" },
      { key: "doggo_wf_ristoranti" },
      { key: "doggo_wf_profilo" },
    ],
    // Gli output divisi in tre sezioni perché le schermate dell'app si vedano: le tavole
    // dell'app (ognuna con più schermate) stanno a tutta larghezza, la landing a due colonne.
    // La tavola di presentazione, che prima chiudeva la pagina, apre il primo gruppo
    output: [],
    outputGroups: [
      // Primi passi: presentazione, onboarding e il profilo (scelta di Giulia, prima in apertura)
      {
        columns: 2,
        tiles: [
          { key: "doggo_1", cols: 2, rows: 2 },
          { key: "doggo_onboarding", cols: 2, rows: 2 },
          { key: "doggo_profilo", cols: 2, rows: 2 },
        ],
      },
      // Trovare un posto: Esplora, mappa e ricerca
      {
        columns: 2,
        tiles: [
          { key: "doggo_esplora", cols: 2, rows: 2 },
          { key: "doggo_mappa", cols: 2, rows: 2 },
          { key: "doggo_ricerca", cols: 2, rows: 2 },
        ],
      },
      // La landing page, su due colonne
      {
        columns: 2,
        tiles: [
          { key: "doggo_landing" },
          { key: "doggo_landing_desktop" },
          { key: "doggo_landing_esplora" },
          { key: "doggo_landing_tablet" },
        ],
      },
    ],
  },
  images: [{ key: "doggo_1" }, { key: "doggo_2" }, { key: "doggo_3" }],
  content: {
    it: {
      title: "Doggo",
      subtitle:
        "L’app per organizzare in tutta comodità le giornate in compagnia del tuo amico a quattro zampe.",
      kind: "App mobile e landing page",
      made: "Interfaccia dell’app, landing page per desktop, tablet e smartphone, prototipo navigabile",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Doggo è un’applicazione dedicata agli amanti dei cani: un’esperienza a 360° per trovare, visitare ed eventualmente prenotare luoghi esclusivamente dog e pet friendly. Il progetto comprende l’app per iOS e la landing page che la presenta, costruita attorno a un’unica azione: scaricare l’app.",
      concept:
        "Minimale e giocosa. Il bianco come colore principale e l’arancione come accento rendono l’app semplice da usare; icone outline, forme morbide e fotografie vivaci di cani le danno un carattere allegro, mai banale.",
      insight:
        "Per il 60% dei padroni poter portare il cane ovunque è essenziale. Doggo non parla della voglia di tornare a casa da lui, ma di portarlo con sé nella vita di tutti i giorni.",
      case: {
        wireframes: [
          {
            label: "Esplora",
            alt: "Due wireframe della sezione Esplora con le categorie, i luoghi vicini e la bacheca degli smarrimenti",
          },
          {
            label: "Ristoranti",
            alt: "Tre wireframe della ricerca dei ristoranti, della scheda del locale e della prenotazione",
          },
          {
            label: "Profilo",
            alt: "Quattro wireframe del profilo utente e del profilo del cane, con foto, amici e libretto delle vaccinazioni",
          },
        ],
        output: [],
        // BOZZA da rileggere: i testi dei gruppi
        outputGroups: [
          {
            title: "Primi passi",
            text: "L’app si presenta con tre schermate di benvenuto, Cerca, Prenota, Esplora, e un onboarding che porta dalla registrazione al profilo. Il profilo tiene insieme la persona e il suo cane, con foto e amici.",
            tiles: [
              {
                label: "Presentazione",
                alt: "Tre schermate di benvenuto dell’app Doggo — Cerca, Prenota, Esplora — su fondo giallo, con un bulldog con gli occhiali da sole in primo piano",
              },
              {
                label: "Onboarding",
                alt: "Quattro schermate di benvenuto dell’app: registrazione completata, «Unisciti a Doggo», «Crea un profilo» e «Iniziare è una passeggiata», con le foto di tre cani",
              },
              {
                label: "Profilo",
                alt: "Un iPhone rosa con il profilo utente di Doggo: foto, pulsante Doggos e i propri amici",
              },
            ],
          },
          {
            title: "Trovare un posto",
            text: "Il cuore dell’app: la sezione Esplora divide i luoghi per categoria, la mappa li mostra intorno a te e la ricerca porta dritta alla scheda del locale, con stelle e fascia di prezzo.",
            tiles: [
              {
                label: "Esplora",
                alt: "Quattro schermate della sezione Esplora con le categorie in pulsanti gialli, i locali consigliati e i parchi vicini",
              },
              {
                label: "Mappa",
                alt: "Tre schermate della mappa con la ricerca «Dove vuoi andare?» e i luoghi dog friendly segnati in arancione",
              },
              {
                label: "Ricerca",
                alt: "Tre schermate della ricerca dei ristoranti, con le schede dei locali, le stelle e le fasce di prezzo",
              },
            ],
          },
          {
            title: "La landing page",
            text: "Una pagina costruita attorno a un’unica azione, scaricare l’app, pensata per desktop, tablet e smartphone, con lo stesso giallo e le stesse foto di cani dell’app.",
            tiles: [
              {
                label: "Landing page",
                alt: "La landing page di Doggo su tablet e smartphone: fondo giallo, il titolo «Just for Doggo lovers» e il pulsante arancione per scaricare l’app",
              },
              {
                label: "Desktop",
                alt: "La landing page di Doggo su un MacBook, con il titolo «Just for Doggo lovers» e il telefono con l’app",
              },
              {
                label: "Pagina Esplora",
                alt: "La pagina Esplora della landing su due iPad: in alto i cani su fondo giallo, sotto «Esplorando Doggo» con le foto dei luoghi e «Ma non finisce qui…»",
              },
              {
                label: "Tablet",
                alt: "La landing page di Doggo su due iPad: la home con un ragazzo e il suo cane in montagna, e la sezione «Entra nella nostra community» con un carlino",
              },
            ],
          },
        ],
      },
      coverAlt:
        "Il logo Doggo su fondo giallo accanto a tre schermate dell’app, con un bulldog francese con occhiali da sole e cocktail e un cocker che si affaccia dall’alto",
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
      subtitle: "The app for planning your days with your four-legged friend, effortlessly.",
      kind: "Mobile app and landing page",
      made: "App interface, landing page for desktop, tablet and smartphone, clickable prototype",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Doggo is an app for dog lovers: a complete experience for finding, visiting and booking places that are strictly dog and pet friendly. The project covers the iOS app and the landing page that presents it, built around a single action: downloading the app.",
      concept:
        "Minimal and playful. White as the main colour and orange as the accent keep the app easy to use; outline icons, soft shapes and lively photos of dogs give it a cheerful character that never feels ordinary.",
      insight:
        "For 60% of owners, being able to take their dog anywhere is essential. Doggo isn’t about wanting to get home to your dog, but about bringing it along in everyday life.",
      case: {
        wireframes: [
          {
            label: "Explore",
            alt: "Two wireframes of the Explore section with categories, nearby places and the lost-dog board",
          },
          {
            label: "Restaurants",
            alt: "Three wireframes of restaurant search, the venue page and booking",
          },
          {
            label: "Profile",
            alt: "Four wireframes of the user and dog profiles, with photo, friends and vaccination record",
          },
        ],
        output: [],
        // BOZZA da rileggere: i testi dei gruppi
        outputGroups: [
          {
            title: "First steps",
            text: "The app introduces itself with three welcome screens, Search, Book, Explore, and an onboarding that leads from sign-up to the profile. The profile brings together the person and their dog, with photos and friends.",
            tiles: [
              {
                label: "Presentation",
                alt: "Three Doggo welcome screens — Cerca, Prenota, Esplora — on a yellow background, with a bulldog wearing sunglasses in the foreground",
              },
              {
                label: "Onboarding",
                alt: "Four app welcome screens: sign-up complete, “Join Doggo”, “Create a profile” and “Getting started is a walk in the park”, with photos of three dogs",
              },
              {
                label: "Profile",
                alt: "A pink iPhone showing the Doggo user profile: photo, Doggos button and friends",
              },
            ],
          },
          {
            title: "Finding a place",
            text: "The heart of the app: Explore sorts places by category, the map shows them around you and search takes you straight to the venue card, with stars and price range.",
            tiles: [
              {
                label: "Explore",
                alt: "Four screens of the Explore section with categories as yellow buttons, recommended venues and nearby parks",
              },
              {
                label: "Map",
                alt: "Three map screens with the “Where do you want to go?” search and dog-friendly places marked in orange",
              },
              {
                label: "Search",
                alt: "Three restaurant search screens, with venue cards, star ratings and price ranges",
              },
            ],
          },
          {
            title: "The landing page",
            text: "A page built around a single action, downloading the app, designed for desktop, tablet and smartphone, with the same yellow and the same dog photos as the app.",
            tiles: [
              {
                label: "Landing page",
                alt: "The Doggo landing page on a tablet and a smartphone: yellow background, the headline “Just for Doggo lovers” and the orange download button",
              },
              {
                label: "Desktop",
                alt: "The Doggo landing page on a MacBook, with the headline “Just for Doggo lovers” and a phone showing the app",
              },
              {
                label: "Explore page",
                alt: "The landing page’s Explore page on two iPads: dogs on a yellow background at the top, then “Esplorando Doggo” with photos of places and “Ma non finisce qui…”",
              },
              {
                label: "Tablet",
                alt: "The Doggo landing page on two iPads: the home with a young man and his dog in the mountains, and the “Join our community” section with a pug",
              },
            ],
          },
        ],
      },
      coverAlt:
        "The Doggo logo on a yellow background next to three app screens, with a French bulldog in sunglasses holding a cocktail and a cocker spaniel peeking in from above",
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
