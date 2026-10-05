import type { Project } from "../types";

// Completato dal materiale in Sito/TLOU/: la presentazione (Presentazione/…PROVA.pdf) per la
// struttura della campagna, VISUAL/ per le affissioni e Instagram, mid visual/ per i visual
// fatti con l'AI. Insight, concept e note degli Output vengono dalla presentazione; prima
// insight e concept erano quelli della bozza del portfolio («Gli oggetti sono un pezzo della
// nostra vita…» e «Ciò che ci portiamo dietro definisce chi siamo»).
// DA CONFERMARE: `date`, e Midjourney tra gli strumenti (dedotto dai nomi dei file AI).
// La moodboard è quella di Giulia (Sito/TLOU/TLOU moodboard.jpg). Gli output sono divisi
// nei tre canali della campagna, nell'ordine del racconto; i visual AI sono stati tolti.
export const theLastOfUs: Project = {
  slug: "the-last-of-us",
  category: "academy",
  areas: ["campaign", "social"],
  date: "2024-03",
  accent: "#8FA36B",
  cover: "tlou_thumb",
  // L'infetto nel buio: quasi tutto nero, il testo chiaro sopra si stacca benissimo
  introImage: "tlou_thumb",
  layout: "case",
  case: {
    moodboard: "tlou_moodboard",
    output: [],
    outputGroups: [
      // Social: Twitter in grande (16:9, stretto sul MacBook) e accanto, alla stessa altezza,
      // il mockup Instagram di Giulia nel riquadro alto
      {
        columns: 3,
        tiles: [{ key: "tlou_twitter", cols: 2, rows: 2 }, { key: "tlou_instagram", rows: 2 }],
      },
      // Affissione classica: su quattro colonne la metro (16:9) e i due manifesti verticali
      // stanno sulla stessa riga, alla stessa altezza
      {
        columns: 4,
        tiles: [
          { key: "tlou_metro", cols: 2, rows: 2 },
          { key: "tlou_pensilina", rows: 2 },
          { key: "tlou_verticale", rows: 2 },
        ],
      },
      // Content creator campaign
      { columns: 2, tiles: [{ key: "tlou_creator_server" }, { key: "tlou_creator_safari" }] },
    ],
  },
  images: [{ key: "tlou_1" }, { key: "tlou_2" }, { key: "tlou_3" }],
  content: {
    it: {
      title: "The Last of Us, stagione 2",
      subtitle: "Una campagna per la seconda stagione, costruita sugli oggetti che ci portiamo dietro.",
      kind: "Campagna integrata",
      made: "Affissione, social, visual con l’AI, content creator campaign",
      tools: "Photoshop, Midjourney",
      intro:
        "Campagna integrata per l’uscita della seconda stagione di The Last of Us, costruita attorno agli oggetti a cui siamo legati: social, affissioni e una content creator campaign raccontano chi, pur di non lasciarli indietro, è pronto ad affrontare l’apocalisse.",
      insight: "Gli oggetti a noi cari rappresentano dei ricordi e delle esperienze passate.",
      concept: "Alcuni oggetti non vanno lasciati indietro.",
      case: {
        moodboardAlt:
          "Moodboard dentro una busta di plastica stropicciata: il logo di The Last of Us, Ellie distesa sull’erba, il simbolo delle Luci, una porta coperta di cordyceps, orologi da tasca, un coltello insanguinato e un anello",
        output: [],
        outputGroups: [
          {
            title: "Social",
            text: "Su Twitter un tweet chiede alle persone di descrivere l’oggetto senza il quale non potrebbero affrontare un’apocalisse globale: quello che le terrebbe legate al proprio passato e al proprio lato umano.\nSu Instagram alcuni di quegli oggetti vengono «pescati» e ambientati nel contesto della serie, come uno specchietto portatile che riflette un infetto. I visual sono realizzati con l’AI e pubblicati sul profilo di The Last of Us.",
            tiles: [
              {
                label: "Twitter",
                alt: "Il profilo Twitter di The Last of Us su un MacBook, con il tweet che chiede a quale oggetto non rinunceremmo e la foto di un orologio al polso",
              },
              {
                label: "Instagram",
                alt: "Due iPhone con Instagram: il post con l’anello tra il muschio generato con l’AI, e il profilo di The Last of Us con la griglia dei visual degli oggetti",
              },
            ],
          },
          {
            title: "Affissione classica",
            text: "Rappresenta i personaggi della serie, o persone comuni, che pur di salvare l’oggetto del cuore si mettono in situazioni di pericolo: come Ellie, che torna indietro a prendere il coltello pur dovendo affrontare gli infetti.",
            tiles: [
              {
                label: "Affissione · metro",
                alt: "Affissione in metropolitana: su fondo nero una borsa aperta e la scritta «Porta con te solo il necessario.», con il logo HBO Max",
              },
              {
                label: "Affissione · pensilina",
                alt: "Pensilina illuminata di notte con il manifesto «Sicuro di non aver dimenticato qualcosa?» e uno zaino da cui spunta un oggetto",
              },
              {
                label: "Affissione · verticale",
                alt: "Manifesto verticale di notte con uno zaino e la scritta «Hai quello che serve per sopravvivere?»",
              },
            ],
          },
          {
            title: "Content creator campaign",
            text: "Quei due sul server, Redez e Synergo, su YouTube dal 2012 con tecnologia e videogiochi, rigiocano la seconda parte di The Last of Us durante l’evento in cui viene presentata la prima della stagione.\nHuman Safari, il canale di viaggi di Nicolò Balini, parte per un viaggio sulle dinamiche di Pechino Express: budget limitato e pochi oggetti scelti da lui, attraverso alcuni dei luoghi incontaminati della seconda stagione.",
            tiles: [
              {
                label: "Quei due sul server",
                alt: "Tavola della content creator campaign con Quei due sul server: rigiocano The Last of Us Parte II all’evento della prima della stagione",
              },
              {
                label: "Human Safari",
                alt: "Tavola della content creator campaign con Human Safari: un viaggio con budget limitato e pochi oggetti nei luoghi della seconda stagione",
              },
            ],
          },
        ],
      },
      coverAlt: "Una creatura infetta appena illuminata su sfondo nero",
      images: [
        { alt: "Una creatura infetta appena illuminata su sfondo nero" },
        {
          title: "Affissioni",
          caption: "«Hai quello che serve per sopravvivere?» e «Porta con te solo il necessario.»",
          alt: "Due affissioni della campagna: una su un edificio con la scritta «Hai quello che serve per sopravvivere?», una in metropolitana con «Porta con te solo il necessario.»",
        },
        {
          title: "Social",
          caption: "Post su Twitter e Instagram.",
          alt: "Post di Twitter e Instagram della campagna, con fotografie di oggetti",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "The Last of Us, season 2",
      subtitle: "A campaign for the second season, built on the things we carry with us.",
      kind: "Integrated campaign",
      made: "Out-of-home, social, AI visuals, content creator campaign",
      tools: "Photoshop, Midjourney",
      intro:
        "Integrated campaign for the launch of The Last of Us season 2, built around the objects we are attached to: social, out-of-home and a content creator campaign tell the story of people ready to face the apocalypse rather than leave them behind.",
      insight: "The objects we hold dear carry our memories and past experiences.",
      concept: "Some things shouldn’t be left behind.",
      case: {
        moodboardAlt:
          "Moodboard inside a crumpled plastic sleeve: The Last of Us logo, Ellie lying in the grass, the Fireflies symbol, a door covered in cordyceps, pocket watches, a bloodied knife and a ring",
        output: [],
        outputGroups: [
          {
            title: "Social",
            text: "On Twitter, a tweet asks people to describe the one object they couldn’t face a global apocalypse without: the one that would keep them tied to their past and to their human side.\nOn Instagram, some of those objects are picked and placed in the world of the series, like a pocket mirror reflecting an infected. The visuals are made with AI and posted on The Last of Us profile.",
            tiles: [
              {
                label: "Twitter",
                alt: "The Last of Us Twitter profile on a MacBook, with the tweet asking which object we couldn’t give up and a photo of a wristwatch",
              },
              {
                label: "Instagram",
                alt: "Two iPhones showing Instagram: the post with the AI-generated ring in moss, and The Last of Us profile with the grid of object visuals",
              },
            ],
          },
          {
            title: "Classic out-of-home",
            text: "It shows characters from the series, or ordinary people, putting themselves in danger to save a treasured object: like Ellie, who goes back for her knife even though it means facing the infected.",
            tiles: [
              {
                label: "Out-of-home · subway",
                alt: "Subway poster: an open bag on black and the line “Carry only what you need.”, with the HBO Max logo",
              },
              {
                label: "Out-of-home · bus shelter",
                alt: "A lit bus shelter at night with the poster “Sure you haven’t forgotten something?” and a backpack with an object peeking out",
              },
              {
                label: "Out-of-home · vertical",
                alt: "Vertical poster at night with a backpack and the line “Do you have what it takes to survive?”",
              },
            ],
          },
          {
            title: "Content creator campaign",
            text: "Quei due sul server, Redez and Synergo, on YouTube since 2012 with tech and video games, replay The Last of Us Part II during the event where the season premiere is presented.\nHuman Safari, Nicolò Balini’s travel channel, sets off on a trip in the style of Pechino Express: a tight budget and a few objects of his choice, through some of the untouched places of season 2.",
            tiles: [
              {
                label: "Quei due sul server",
                alt: "Content creator campaign board with Quei due sul server: replaying The Last of Us Part II at the season premiere event",
              },
              {
                label: "Human Safari",
                alt: "Content creator campaign board with Human Safari: a trip on a tight budget with a few objects through the locations of season 2",
              },
            ],
          },
        ],
      },
      coverAlt: "An infected creature barely lit against a black background",
      images: [
        { alt: "An infected creature barely lit against a black background" },
        {
          title: "Out-of-home",
          caption: "“Do you have what it takes to survive?” and “Carry only what you need.”",
          alt: "Two posters from the campaign: one on a building reading “Do you have what it takes to survive?”, one in the subway reading “Carry only what you need.”",
        },
        {
          title: "Social",
          caption: "Twitter and Instagram posts.",
          alt: "Twitter and Instagram posts from the campaign, with photographs of objects",
        },
      ],
    },
  },
};
