import type { Project } from "../types";

// PRIMO PROGETTO PROFESSIONALE. I testi qui sotto sono una BOZZA ricavata da quello che si
// vede nelle immagini: vanno riletti da Giulia, che è l'unica a sapere come è andata davvero.
// Da confermare in particolare: `date` (decide l'ordine e il filtro per anno nella pagina
// Lavori), `kind`, `made`, `tools` e `areas`.
export const syntonia: Project = {
  slug: "syntonia",
  category: "works",
  areas: ["branding", "art-direction", "campaign", "social"],
  // Anno confermato da Giulia; il mese è ancora da precisare
  date: "2026-01",
  // Il verde lime del marchio, campionato dal logo
  accent: "#BBCE00",
  cover: "syntonia_cover",
  // Veduta aerea di un ponte: scura e uniforme, regge bene il testo chiaro sopra
  introImage: "syntonia_bg",
  // Il video di presentazione. Il file in public/video è la versione web, ricavata dal master
  // in Sito/ (vedi README): tagliate le fasce nere e ricompresso da 66MB a 11MB, perché
  // Cloudflare Pages rifiuta oltre i 25MB. Nel mastro sta subito dopo l'identità visiva
  video: { src: "syntonia", poster: "syntonia_video" },
  // Mastro 1, come Doggo, Rikka e The Last of Us. Il rebranding diventa l'identità visiva,
  // il video ha un blocco suo, i poster e le tavole social sono i gruppi di output.
  // Manca la moodboard: per ora c'è il segnaposto
  layout: "case",
  case: {
    identity: [
      { key: "syntonia_rebrand_1", cols: 2, rows: 2 },
      { key: "syntonia_identity", rows: 2 },
      { key: "syntonia_brand_1", rows: 2 },
      { key: "syntonia_brand_2", rows: 2 },
      { key: "syntonia_brand_3", rows: 2 },
    ],
    output: [],
    // I mosaici degli output più stretti: a tutta larghezza le immagini (1080–1448 px) si
    // vedevano sgranate
    outputWidth: "narrow",
    outputGroups: [
      // Su due colonne: la panoramica della sede a tutta larghezza, poi l'affissione in strada
      // e il manifesto verticale affiancati, e sotto gli altri due mockup. Nei mockup il clic
      // apre il manifesto piatto
      {
        columns: 2,
        tiles: [
          { key: "syntonia_mock_5", cols: 2, rows: 2 },
          { key: "syntonia_3", rows: 2 },
          { key: "syntonia_mock_4", rows: 2, artwork: "syntonia_poster_1" },
          { key: "syntonia_mock_2", artwork: "syntonia_poster_2" },
          { key: "syntonia_mock_6", artwork: "syntonia_poster_3" },
        ],
      },
      // Social: le tavole 4:5 tutte su una riga
      {
        columns: 4,
        tiles: [
          { key: "syntonia_4", rows: 2 },
          { key: "syntonia_1", rows: 2 },
          { key: "syntonia_2", rows: 2 },
          { key: "syntonia_5", rows: 2 },
        ],
      },
    ],
  },
  // Non usate dal mastro: restano come elenco delle tavole del progetto
  images: [
    { key: "syntonia_1", half: true },
    { key: "syntonia_2", half: true },
    { key: "syntonia_3", half: true },
    { key: "syntonia_4", half: true },
    { key: "syntonia_5", half: true },
  ],
  content: {
    it: {
      title: "Syntonia",
      // BOZZA da rileggere
      subtitle: "Un rebranding per il noleggio a lungo termine: persone, auto e strada sulla stessa frequenza.",
      kind: "Campagna integrata",
      made: "Rebranding, art direction, visual, contenuti per i social",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia noleggia auto a lungo termine, ma quello che racconta è il viaggio che ci fai. Il nome gioca su «sintonia», e da lì nasce tutto: un marchio che tiene insieme un diapason e un segnaposto, l’affissione, e i contenuti social costruiti sulle persone invece che sulle rate. Il payoff: «Immagina, Scegli, Guida.»",
      insight:
        "Il noleggio a lungo termine si racconta quasi sempre con i numeri: rate, chilometri, scadenze.",
      // BOZZA da rileggere: il concept esteso
      concept:
        "Quando elementi diversi si muovono con la stessa frequenza. Syntonia mette in sintonia chi guida, l’auto e la strada: il noleggio non si racconta con rate e chilometri, ma con le persone, i luoghi e il viaggio che fai. E ogni pezzo del sistema, dal marchio ai poster, suona sulla stessa nota.",
      video: { title: "Il video", caption: "Il filmato di presentazione del progetto." },
      case: {
        identity: [
          {
            label: "Costruzione del marchio",
            alt: "Il marchio Syntonia bianco su una sala riunioni in penombra, con le linee di costruzione e l’onda sonora sovrapposte",
          },
          {
            label: "Marchio e palette",
            alt: "Tavola dell’identità Syntonia su fondo nero: il logo esteso, il segno su bianco e su verde scuro, il blocco con il payoff e la scala dei verdi",
          },
          {
            label: "Il diapason",
            alt: "Slide «Il diapason»: il marchio Syntonia su un motivo di mappe, con la scritta «Simbolo di precisione. L’equilibrio prima della scelta»",
          },
          {
            label: "La strada",
            alt: "Slide «La strada»: il marchio Syntonia con la strada verde in evidenza e la scritta «Simbolo di movimento. Il percorso conta quanto la destinazione»",
          },
          {
            label: "Il pin",
            alt: "Slide «Il pin»: il contorno del segnaposto Syntonia e la scritta «Simbolo di presenza. La destinazione in un unico segno»",
          },
        ],
        // BOZZA da rileggere: i testi dei gruppi, ricavati dalle vecchie didascalie
        output: [],
        outputGroups: [
          {
            title: "Affissione e poster per la sede",
            text: "In strada l’affissione racconta il viaggio dall’abitacolo: «L’esperienza che vivi, cambia il modo in cui arrivi». In sede tre manifesti portano il marchio alle pareti dell’open space; cliccando un mockup si apre il manifesto intero.",
            tiles: [
              {
                label: "In sede",
                alt: "L’open space della sede Syntonia: due manifesti orizzontali sulla parete di fondo e uno verticale sul pilastro accanto, con la città oltre la vetrata",
              },
              {
                label: "Affissione",
                alt: "Un manifesto Syntonia affisso su un muro di strada, con una strada di montagna vista dall’abitacolo, mentre passa un ciclista",
              },
              {
                label: "Alla scrivania",
                alt: "Il manifesto verticale Syntonia incorniciato alla parete di un ufficio, con scrivania e pianta accanto",
                artworkAlt:
                  "Manifesto verticale Syntonia: una donna con il berretto giallo appoggiata a un’auto aperta davanti alle montagne all’alba, dentro il contorno del segnaposto",
              },
              {
                label: "Nella sala",
                alt: "Il manifesto orizzontale Syntonia appeso alla parete di una sala, sopra un divano",
                artworkAlt:
                  "Manifesto orizzontale Syntonia: una bambina saluta dal finestrino di un’auto bianca, accanto a una donna con il cappello di paglia",
              },
              {
                label: "Nell’ufficio",
                alt: "Il manifesto orizzontale Syntonia incorniciato alla parete di un ufficio, sopra la credenza e accanto alla vetrata",
                artworkAlt:
                  "Manifesto Syntonia: un’auto verde su un ponte sospeso tra le nuvole, con il payoff «La mobilità giusta è equilibrio. Tra esigenze, costi e utilizzo reale»",
              },
            ],
          },
          {
            title: "Social",
            text: "Sui social le persone vengono prima delle rate: tappe, partenze e luoghi raccontano il noleggio come un viaggio da fare, e il marchio torna in ogni contenuto.",
            tiles: [
              {
                label: "Profilo",
                alt: "Il profilo Instagram di Syntonia su uno smartphone, con accanto alcuni post della pagina",
              },
              {
                label: "Il marchio",
                alt: "Il marchio Syntonia nelle sue versioni su fondo bianco, verde scuro e verde lime, con il motivo delle mappe stradali",
              },
              {
                label: "Il concetto",
                alt: "Quattro immagini: un’affissione su un palazzo, una riunione in ufficio, una famiglia in montagna e la definizione di «sintonia» sul bagagliaio di un’auto",
              },
              {
                label: "Contenuti",
                alt: "Un contenuto social con una famiglia in cammino davanti a un fiordo e un messaggio che dice «Prima tappa alle 8.00, poi si parte»",
              },
            ],
          },
        ],
      },
      coverAlt:
        "Una famiglia in auto, l’uomo al volante e la donna che canta accanto a lui, con il marchio Syntonia al centro",
      images: [
        {
          title: "Il marchio",
          caption: "Un diapason e un segnaposto nello stesso segno.",
          alt: "Il marchio Syntonia nelle sue versioni su fondo bianco, verde scuro e verde lime, con il motivo delle mappe stradali",
        },
        {
          title: "Il concetto",
          caption: "Dalla definizione di sintonia alle persone e ai luoghi.",
          alt: "Quattro immagini: un’affissione su un palazzo, una riunione in ufficio, una famiglia in montagna e la definizione di «sintonia» sul bagagliaio di un’auto",
        },
        {
          title: "Affissione",
          caption: "«L’esperienza che vivi, cambia il modo in cui arrivi.»",
          alt: "Un manifesto Syntonia affisso su un muro di strada, con una strada di montagna vista dall’abitacolo, mentre passa un ciclista",
        },
        {
          title: "Social",
          caption: "Il profilo e i contenuti pubblicati.",
          alt: "Il profilo Instagram di Syntonia su uno smartphone, con accanto alcuni post della pagina",
        },
        {
          title: "Contenuti",
          caption: "«Prima tappa alle 8.00, poi si parte.»",
          alt: "Un contenuto social con una famiglia in cammino davanti a un fiordo e un messaggio che dice «Prima tappa alle 8.00, poi si parte»",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Syntonia",
      subtitle: "A rebrand for long-term car rental: people, cars and the road on the same frequency.",
      kind: "Integrated campaign",
      made: "Rebrand, art direction, visuals, social content",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia rents cars long term, but what it talks about is the journey you take in them. The name plays on the Italian “sintonia”, being in tune, and everything grows from there: a logo that holds a tuning fork and a map pin in one shape, the outdoor campaign, and social content built around people rather than monthly rates. The payoff: “Imagine, Choose, Drive.”",
      insight:
        "Long-term car rental is almost always sold with numbers: monthly rates, mileage, deadlines.",
      concept:
        "When different elements move at the same frequency. Syntonia puts the driver, the car and the road in tune: rental is told not through monthly rates and mileage but through people, places and the journey you take. And every part of the system, from the logo to the posters, plays the same note.",
      video: { title: "The video", caption: "The project's presentation film." },
      case: {
        identity: [
          {
            label: "Building the logo",
            alt: "The white Syntonia logo over a dimly lit meeting room, with construction lines and a sound wave overlaid",
          },
          {
            label: "Logo and palette",
            alt: "The Syntonia identity board on black: the full logo, the mark on white and on dark green, the lockup with the payoff and the range of greens",
          },
          {
            label: "The tuning fork",
            alt: "Slide “Il diapason”: the Syntonia mark on a map pattern, captioned “a symbol of precision, the balance that comes before the choice”",
          },
          {
            label: "The road",
            alt: "Slide “La strada”: the Syntonia mark with the green road highlighted, captioned “a symbol of movement, the journey matters as much as the destination”",
          },
          {
            label: "The pin",
            alt: "Slide “Il pin”: the outline of the Syntonia map pin, captioned “a symbol of presence, the destination in a single shape”",
          },
        ],
        output: [],
        outputGroups: [
          {
            title: "Outdoor and posters for the office",
            text: "On the street, the poster tells the journey from inside the car: “The experience you live changes the way you arrive.” In the office, three posters bring the brand to the walls of the open plan space; click a mockup to see the poster whole.",
            tiles: [
              {
                label: "In the office",
                alt: "The Syntonia open plan office: two horizontal posters on the far wall and a vertical one on the pillar beside it, with the city through the window",
              },
              {
                label: "Outdoor",
                alt: "A Syntonia poster on a street wall, showing a mountain road seen from inside a car, as a cyclist rides past",
              },
              {
                label: "By the desk",
                alt: "The vertical Syntonia poster framed on an office wall, with a desk and a plant beside it",
                artworkAlt:
                  "Vertical Syntonia poster: a woman in a yellow beanie leaning against an open car boot in front of mountains at dawn, inside the outline of the map pin",
              },
              {
                label: "In the lounge",
                alt: "The horizontal Syntonia poster hanging on a lounge wall, above a sofa",
                artworkAlt:
                  "Horizontal Syntonia poster: a little girl waving from the window of a white car, next to a woman in a straw hat",
              },
              {
                label: "In the meeting room",
                alt: "The horizontal Syntonia poster framed on an office wall, above the sideboard and next to the glass wall",
                artworkAlt:
                  "Syntonia poster: a green car on a bridge suspended among the clouds, with the tagline “La mobilità giusta è equilibrio. Tra esigenze, costi e utilizzo reale”",
              },
            ],
          },
          {
            title: "Social",
            text: "On social, people come before monthly rates: stops, departures and places tell rental as a journey to take, and the brand returns in every post.",
            tiles: [
              {
                label: "Profile",
                alt: "The Syntonia Instagram profile on a smartphone, with some of the page's posts beside it",
              },
              {
                label: "The logo",
                alt: "The Syntonia logo in its versions on white, dark green and lime green, with the street map pattern",
              },
              {
                label: "The concept",
                alt: "Four images: a billboard on a building, a meeting in an office, a family in the mountains, and the definition of “sintonia” on the boot of a car",
              },
              {
                label: "Content",
                alt: "A social post with a family walking in front of a fjord and a message reading “First stop at 8.00, then we set off”",
              },
            ],
          },
        ],
      },
      coverAlt:
        "A family in a car, the man at the wheel and the woman singing beside him, with the Syntonia logo in the middle",
      images: [
        {
          title: "The logo",
          caption: "A tuning fork and a map pin in a single shape.",
          alt: "The Syntonia logo in its versions on white, dark green and lime green, with the street map pattern",
        },
        {
          title: "The concept",
          caption: "From the definition of being in tune to people and places.",
          alt: "Four images: a billboard on a building, a meeting in an office, a family in the mountains, and the definition of “sintonia” on the boot of a car",
        },
        {
          title: "Outdoor",
          caption: "“The experience you live changes the way you arrive.”",
          alt: "A Syntonia poster on a street wall, showing a mountain road seen from inside a car, as a cyclist rides past",
        },
        {
          title: "Social",
          caption: "The profile and the content published on it.",
          alt: "The Syntonia Instagram profile on a smartphone, with some of the page's posts beside it",
        },
        {
          title: "Content",
          caption: "“First stop at 8.00, then we set off.”",
          alt: "A social post with a family walking in front of a fjord and a message reading “First stop at 8.00, then we set off”",
        },
      ],
    },
  },
};
