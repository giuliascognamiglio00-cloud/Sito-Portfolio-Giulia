import type { Project } from "../types";

// PRIMO PROGETTO PROFESSIONALE: il rebranding di Syntonia SpA. I testi (brief, punto di
// partenza, claim, look and feel) sono ricavati dal brand book in Sito/SYNTONIA, che però resta
// del cliente: nella pagina ci sono solo le immagini di Giulia, nessuna tavola del brand book.
export const syntonia: Project = {
  slug: "syntonia",
  category: "works",
  areas: ["branding", "art-direction", "campaign", "social"],
  // Il brand book è chiuso a marzo 2026
  date: "2026-03",
  // Il Verde Lime ufficiale della palette primaria
  accent: "#BACE00",
  cover: "syntonia_cover",
  // Veduta aerea di un ponte: scura e uniforme, regge bene il testo chiaro sopra
  introImage: "syntonia_bg",
  // Il video di presentazione. Il file in public/video è la versione web, ricavata dal master
  // in Sito/ (vedi README): tagliate le fasce nere e ricompresso da 66MB a 11MB, perché
  // Cloudflare Pages rifiuta oltre i 25MB. Nel mastro sta subito dopo l'identità visiva
  video: { src: "syntonia", poster: "syntonia_video" },
  // Mastro 1, come Doggo, Rikka e The Last of Us. Il racconto (punto di partenza, claim, look
  // and feel) sta sotto al brief; poi identità visiva, video, poster e social. Tutta la pagina
  // è senza cornici
  layout: "case",
  case: {
    bare: true,
    // Nessuna moodboard di Giulia per questo progetto: la sezione non compare
    moodboard: false,
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
      // Social: le tavole 1080×1350 in un carosello da scorrere, come il backstage di Oculus
      // ma nel loro formato 4:5, senza mosaico sotto
      {
        carousel: ["syntonia_4", "syntonia_1", "syntonia_2", "syntonia_5"],
        tiles: [],
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
      subtitle: "Il rebranding di una società di noleggio a lungo termine: esigenze, soluzioni e servizi sulla stessa frequenza.",
      kind: "Rebranding",
      made: "Marchio, brand book, art direction, affissioni, contenuti per i social",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia SpA è partner di Arval Italia nel noleggio a lungo termine e affianca privati, professionisti e aziende in tutto il percorso: l’analisi delle esigenze, la scelta della formula, le pratiche, l’assistenza.\nIl progetto è il rebranding completo: un nuovo marchio, un brand book che ne fissa le regole su ogni supporto, online e offline, e la comunicazione che ne nasce, dalle affissioni ai social.",
      insight: "«La differenza tra un contratto e un altro è la persona che ti accompagna.»",
      concept:
        "Il nome richiama la sintonia: elementi diversi che, con ascolto e precisione, trovano il loro equilibrio senza forzature. Il simbolo è il diapason, che dà la frequenza di riferimento a cui tutto il resto si accorda. Allo stesso modo Syntonia non impone soluzioni: offre un punto fermo da cui ogni scelta di mobilità può essere valutata con consapevolezza.",
      video: { title: "Il video", caption: "Il filmato di presentazione del progetto." },
      case: {
        story: [
          {
            at: "intro",
            title: "Da dove partiva",
            blocks: [
              "Syntonia aveva già un marchio, ma lavora in un settore che le persone vivono come complesso e frammentato: tante soluzioni, offerte difficili da confrontare, un rapporto che spesso si chiude con la firma. In un mercato percepito come impersonale, quello che fa la differenza è la relazione con il consulente.",
              { quote: "Syntonia esiste per essere quella presenza competente, chiara e affidabile che trasforma la mobilità in un’esperienza semplice." },
              "Il rebranding parte da qui. La vision è restituire controllo, chiarezza e serenità a chi gestisce la propria mobilità; la mission è progettare soluzioni su misura, integrando i servizi Arval con una consulenza attenta. Il nuovo marchio doveva quindi parlare di ordine e di fiducia, non di promozioni: trasparenza, consulenza, continuità, affidabilità e semplicità sono i valori da cui nasce ogni scelta visiva.",
            ],
          },
          {
            at: "intro",
            title: "Il claim",
            blocks: [
              "«Immagina, Scegli, Guida.» sintetizza il percorso che il brand costruisce insieme al cliente. Accompagna i contenuti istituzionali senza diventare uno slogan: niente urgenza, niente toni da promozione. Lo stesso vale per il tono di voce, chiaro, misurato e professionale.",
            ],
            cards: [
              { title: "Immagina", text: "La comprensione iniziale: leggere bisogni e scenari di mobilità per arrivare a scelte consapevoli." },
              { title: "Scegli", text: "Il momento della decisione, guidato da consulenza, confronto e trasparenza, senza pressione commerciale." },
              { title: "Guida", text: "La continuità: il rapporto prosegue dalla gestione all’assistenza, fino al rinnovo o alla restituzione." },
            ],
          },
          {
            at: "intro",
            title: "Il look and feel",
            blocks: [
              "Il marchio tiene insieme tre segni in un pittogramma: il diapason, simbolo di precisione, l’equilibrio prima della scelta; la strada, simbolo di movimento, perché il percorso conta quanto la destinazione; il pin, simbolo di presenza. È costruito su un modulo, la X, pari all’altezza del payoff, che ne fissa proporzioni e aree di rispetto, e vive in versione verticale, la principale, e orizzontale.",
              "Dal marchio nascono gli elementi di supporto. Il pin evidenzia un dato, di solito il canone; la strada è un segno fluido che resta sempre sullo sfondo; un pattern disegna una rete stradale astratta che accompagna i contenuti senza mai prendere il posto del marchio.",
            ],
            cards: [
              { title: "Colore", text: "Tre verdi con un ruolo strutturale, non decorativo: Bosco, Strutturale e Lime, in una gerarchia 60/30/10." },
              { title: "Tipografia", text: "Poppins per i titoli, Inter per i testi e i numeri, su una scala modulare in quarta giusta (1,333)." },
              { title: "Fotografia", text: "Persone e situazioni credibili, luce naturale, nessuna narrazione troppo emotiva: chi guarda deve potersi riconoscere." },
            ],
          },
        ],
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
            alt: "Slide «Il diapason»: il marchio Syntonia sul pattern della rete stradale, con la scritta «Simbolo di precisione. L’equilibrio prima della scelta»",
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
        output: [],
        outputGroups: [
          {
            title: "Affissione e poster per la sede",
            text: "In strada l’affissione racconta il viaggio dall’abitacolo: «L’esperienza che vivi, cambia il modo in cui arrivi». In sede tre manifesti portano il marchio alle pareti dell’open space, con foto in luce naturale e il contorno del pin a incorniciare le persone; cliccando un mockup si apre il manifesto intero.",
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
            text: "Sul profilo il marchio, il pattern della rete stradale e la fotografia lavorano insieme: persone, auto e luoghi in situazioni credibili, con il tono chiaro e misurato del brand.",
            tiles: [],
            carousel: [
              {
                caption: "Il profilo Instagram, con la griglia dei post.",
                alt: "Il profilo Instagram di Syntonia su uno smartphone, con accanto alcuni post della pagina",
              },
              {
                caption: "Il marchio nei suoi tre fondi.",
                alt: "Il marchio Syntonia nelle sue versioni su fondo bianco, verde scuro e verde lime, con il pattern della rete stradale",
              },
              {
                caption: "Dalla definizione di sintonia alle persone e ai luoghi.",
                alt: "Quattro immagini: un’affissione su un palazzo, una riunione in ufficio, una famiglia in montagna e la definizione di «sintonia» sul bagagliaio di un’auto",
              },
              {
                caption: "«Prima tappa alle 8.00, poi si parte.»",
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
          caption: "Diapason, strada e pin nello stesso segno.",
          alt: "Il marchio Syntonia nelle sue versioni su fondo bianco, verde scuro e verde lime, con il pattern della rete stradale",
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
    en: {
      title: "Syntonia",
      subtitle: "Rebranding a long-term car rental company: needs, solutions and services on the same frequency.",
      kind: "Rebrand",
      made: "Logo, brand book, art direction, outdoor, social content",
      tools: "Photoshop, Illustrator, InDesign",
      intro:
        "Syntonia SpA is an Arval Italia partner in long-term car rental, supporting individuals, professionals and companies through the whole journey: understanding their needs, choosing the plan, handling the paperwork, ongoing support.\nThe project is a complete rebrand: a new logo, a brand book setting out its rules on every medium, online and offline, and the communication that grows from it, from billboards to social.",
      insight: "“The difference between one contract and another is the person who guides you.”",
      concept:
        "The name comes from the Italian “sintonia”, being in tune: different elements that, through listening and precision, find their balance without being forced. The symbol is the tuning fork, which sets the reference frequency everything else tunes to. In the same way, Syntonia doesn’t impose solutions: it offers a fixed point from which every mobility choice can be weighed with awareness.",
      video: { title: "The video", caption: "The project's presentation film." },
      case: {
        // Il claim resta in italiano: il brand book vieta di tradurlo
        story: [
          {
            at: "intro",
            title: "The starting point",
            blocks: [
              "Syntonia already had a logo, but it works in a sector people experience as complex and fragmented: many solutions, offers that are hard to compare, a relationship that often ends at the signature. In a market seen as impersonal, what makes the difference is the relationship with the advisor.",
              { quote: "Syntonia exists to be the competent, clear and reliable presence that turns mobility into a simple experience." },
              "The rebrand starts from there. The vision is to give back control, clarity and peace of mind to people managing their mobility; the mission is to design tailored solutions, combining Arval’s services with careful advice. So the new brand had to speak of order and trust, not of deals: transparency, expert advice, continuity, reliability and simplicity are the values behind every visual choice.",
            ],
          },
          {
            at: "intro",
            title: "The claim",
            blocks: [
              "“Immagina, Scegli, Guida.” (Imagine, Choose, Drive) sums up the journey the brand builds together with the client. It accompanies institutional content without becoming a slogan: no urgency, no promotional tone. The same goes for the tone of voice, which is clear, measured and professional.",
            ],
            cards: [
              { title: "Immagina", meta: "Imagine", text: "The first understanding: reading needs and mobility scenarios to reach informed choices." },
              { title: "Scegli", meta: "Choose", text: "The decision, guided by advice, comparison and transparency, with no sales pressure." },
              { title: "Guida", meta: "Drive", text: "Continuity: the relationship goes on from management to support, through to renewal or return." },
            ],
          },
          {
            at: "intro",
            title: "The look and feel",
            blocks: [
              "The logo brings three signs together in one pictogram: the tuning fork, a symbol of precision, the balance before the choice; the road, a symbol of movement, because the journey matters as much as the destination; the pin, a symbol of presence. It is built on a module, X, equal to the height of the payoff, which sets its proportions and clear space, and it comes in a vertical version, the main one, and a horizontal one.",
              "The supporting elements grow out of the logo. The pin highlights a key figure, usually the monthly fee; the road is a fluid shape that always stays in the background; a pattern draws an abstract road network that accompanies the content without ever taking the logo’s place.",
            ],
            cards: [
              { title: "Colour", text: "Three greens with a structural role, not a decorative one: Forest, Structural and Lime, in a 60/30/10 hierarchy." },
              { title: "Typography", text: "Poppins for headings, Inter for body text and numbers, on a perfect fourth modular scale (1.333)." },
              { title: "Photography", text: "Believable people and situations, natural light, no overly emotional storytelling: viewers should recognise themselves." },
            ],
          },
        ],
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
            alt: "Slide “Il diapason”: the Syntonia mark on the road network pattern, captioned “a symbol of precision, the balance that comes before the choice”",
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
            text: "On the street, the poster tells the journey from inside the car: “The experience you live changes the way you arrive.” In the office, three posters bring the brand to the walls of the open plan space, with photos in natural light and the outline of the pin framing the people; click a mockup to see the poster whole.",
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
            text: "On the profile, the logo, the road network pattern and the photography work together: people, cars and places in believable situations, in the brand’s clear and measured tone.",
            tiles: [],
            carousel: [
              {
                caption: "The Instagram profile, with the grid of posts.",
                alt: "The Syntonia Instagram profile on a smartphone, with some of the page's posts beside it",
              },
              {
                caption: "The logo on its three backgrounds.",
                alt: "The Syntonia logo in its versions on white, dark green and lime green, with the road network pattern",
              },
              {
                caption: "From the definition of being in tune to people and places.",
                alt: "Four images: a billboard on a building, a meeting in an office, a family in the mountains, and the definition of “sintonia” on the boot of a car",
              },
              {
                caption: "“First stop at 8.00, then we set off.”",
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
          caption: "A tuning fork, a road and a map pin in a single mark.",
          alt: "The Syntonia logo in its versions on white, dark green and lime green, with the road network pattern",
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
