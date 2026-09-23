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
  // Il video di presentazione prende il posto della griglia sotto al carosello. Il file in
  // public/video è la versione web, ricavata dal master in Sito/ (vedi README): tagliate le
  // fasce nere e ricompresso da 66MB a 11MB, perché Cloudflare Pages rifiuta oltre i 25MB.
  video: { src: "syntonia", poster: "syntonia_video" },
  // Subito dopo il rebranding e prima delle affissioni, con tanto vuoto attorno
  videoAfter: 0,
  carousel: "end",
  sections: [
    {
      // Il terzo riquadro ha tre immagini: diventa un carosello da sfogliare
      images: [
        "syntonia_rebrand_1",
        "syntonia_identity",
        ["syntonia_brand_1", "syntonia_brand_2", "syntonia_brand_3"],
      ],
    },
    {
      layout: "grid",
      lead: true,
      // Apre la panoramica della sede; sotto i tre mockup, e il manifesto piatto si vede
      // solo cliccando quello che lo contiene
      images: [
        "syntonia_mock_3",
        { mockup: "syntonia_mock_4", artwork: "syntonia_poster_1" },
        { mockup: "syntonia_mock_2", artwork: "syntonia_poster_2" },
        { mockup: "syntonia_mock_1", artwork: "syntonia_poster_1" },
      ],
    },
  ],
  // Stessa impostazione di Rikka Peppers: carosello e, sotto, il video. Le immagini sono
  // verticali, quindi nel carosello le slide si stringono da sole.
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
      kind: "Campagna integrata",
      made: "Rebranding, art direction, visual, contenuti per i social",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia noleggia auto a lungo termine, ma quello che racconta è il viaggio che ci fai. Il nome gioca su «sintonia», e da lì nasce tutto: un marchio che tiene insieme un diapason e un segnaposto, l’affissione, e i contenuti social costruiti sulle persone invece che sulle rate. Il payoff: «Immagina, Scegli, Guida.»",
      insight:
        "Il noleggio a lungo termine si racconta quasi sempre con i numeri: rate, chilometri, scadenze.",
      concept: "Quando elementi diversi si muovono con la stessa frequenza.",
      video: { title: "Il video", caption: "Il filmato di presentazione del progetto." },
      sections: [
        {
          title: "Il rebranding",
          items: [
            {
              title: "Costruzione del marchio",
              caption:
                "Un diapason dentro un segnaposto: la frequenza e il luogo nello stesso segno, costruito su una griglia di cerchi e sull’onda che ne esce.",
              alt: "Il marchio Syntonia bianco su una sala riunioni in penombra, con le linee di costruzione e l’onda sonora sovrapposte",
            },
            {
              title: "Marchio e palette",
              caption:
                "Le versioni del logo, dal segno da solo al blocco con il payoff, e i verdi che tengono insieme il sistema.",
              alt: "Tavola dell’identità Syntonia su fondo nero: il logo esteso, il segno su bianco e su verde scuro, il blocco con il payoff e la scala dei verdi",
            },
            {
              title: "I tre simboli",
              caption:
                "Il segno si scompone in tre: il diapason, la strada e il pin. Precisione, movimento, presenza.",
              alt: [
                "Slide «Il diapason»: il marchio Syntonia su un motivo di mappe, con la scritta «Simbolo di precisione. L’equilibrio prima della scelta»",
                "Slide «La strada»: il marchio Syntonia con la strada verde in evidenza e la scritta «Simbolo di movimento. Il percorso conta quanto la destinazione»",
                "Slide «Il pin»: il contorno del segnaposto Syntonia e la scritta «Simbolo di presenza. La destinazione in un unico segno»",
              ],
            },
          ],
        },
        {
          title: "I poster per la sede",
          items: [
            {
              title: "In sede",
              caption: "I tre manifesti alle pareti dell’open space.",
              alt: "L’open space della sede Syntonia con i tre manifesti appesi alle pareti e il marchio accanto alla finestra",
            },
            {
              title: "Alla scrivania",
              caption: "«Ogni destinazione parte da una scelta.» Clicca per vederlo intero.",
              alt: [
                "Il manifesto verticale Syntonia incorniciato alla parete di un ufficio, con scrivania e pianta accanto",
                "Manifesto verticale Syntonia: una donna con il berretto giallo appoggiata a un’auto aperta davanti alle montagne all’alba, dentro il contorno del segnaposto",
              ],
            },
            {
              title: "Nella sala",
              caption: "«Un noleggio funziona quando è tutto in armonia.» Clicca per vederlo intero.",
              alt: [
                "Il manifesto orizzontale Syntonia appeso alla parete di una sala, sopra un divano",
                "Manifesto orizzontale Syntonia: una bambina saluta dal finestrino di un’auto bianca, accanto a una donna con il cappello di paglia",
              ],
            },
            {
              title: "Nel corridoio",
              caption: "«Ogni destinazione parte da una scelta.» Clicca per vederlo intero.",
              alt: [
                "Il manifesto verticale Syntonia appeso nel corridoio degli uffici, accanto al marchio a parete",
                "Manifesto verticale Syntonia: una donna con il berretto giallo appoggiata a un’auto aperta davanti alle montagne all’alba, dentro il contorno del segnaposto",
              ],
            },
          ],
        },
      ],
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
      kind: "Integrated campaign",
      made: "Rebrand, art direction, visuals, social content",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia rents cars long term, but what it talks about is the journey you take in them. The name plays on the Italian “sintonia”, being in tune, and everything grows from there: a logo that holds a tuning fork and a map pin in one shape, the outdoor campaign, and social content built around people rather than monthly rates. The payoff: “Imagine, Choose, Drive.”",
      insight:
        "Long-term car rental is almost always sold with numbers: monthly rates, mileage, deadlines.",
      concept: "When different elements move at the same frequency.",
      video: { title: "The video", caption: "The project's presentation film." },
      sections: [
        {
          title: "The rebrand",
          items: [
            {
              title: "Building the logo",
              caption:
                "A tuning fork inside a map pin: frequency and place in one shape, built on a grid of circles and on the wave that comes out of it.",
              alt: "The white Syntonia logo over a dimly lit meeting room, with construction lines and a sound wave overlaid",
            },
            {
              title: "Logo and palette",
              caption:
                "The logo in its versions, from the mark on its own to the lockup with the payoff, and the greens that hold the system together.",
              alt: "The Syntonia identity board on black: the full logo, the mark on white and on dark green, the lockup with the payoff and the range of greens",
            },
            {
              title: "The three symbols",
              caption:
                "The mark breaks down into three: the tuning fork, the road and the pin. Precision, movement, presence.",
              alt: [
                "Slide “Il diapason”: the Syntonia mark on a map pattern, captioned “a symbol of precision, the balance that comes before the choice”",
                "Slide “La strada”: the Syntonia mark with the green road highlighted, captioned “a symbol of movement, the journey matters as much as the destination”",
                "Slide “Il pin”: the outline of the Syntonia map pin, captioned “a symbol of presence, the destination in a single shape”",
              ],
            },
          ],
        },
        {
          title: "Posters for the office",
          items: [
            {
              title: "In the office",
              caption: "The three posters on the walls of the open plan office.",
              alt: "The Syntonia open plan office with the three posters on the walls and the logo beside the window",
            },
            {
              title: "By the desk",
              caption:
                "“Ogni destinazione parte da una scelta” — every destination starts with a choice. Click to see it whole.",
              alt: [
                "The vertical Syntonia poster framed on an office wall, with a desk and a plant beside it",
                "Vertical Syntonia poster: a woman in a yellow beanie leaning against an open car boot in front of mountains at dawn, inside the outline of the map pin",
              ],
            },
            {
              title: "In the lounge",
              caption:
                "“Un noleggio funziona quando è tutto in armonia” — a rental works when everything is in tune. Click to see it whole.",
              alt: [
                "The horizontal Syntonia poster hanging on a lounge wall, above a sofa",
                "Horizontal Syntonia poster: a little girl waving from the window of a white car, next to a woman in a straw hat",
              ],
            },
            {
              title: "In the corridor",
              caption:
                "“Ogni destinazione parte da una scelta” — every destination starts with a choice. Click to see it whole.",
              alt: [
                "The vertical Syntonia poster hanging in an office corridor, next to the logo on the wall",
                "Vertical Syntonia poster: a woman in a yellow beanie leaning against an open car boot in front of mountains at dawn, inside the outline of the map pin",
              ],
            },
          ],
        },
      ],
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
