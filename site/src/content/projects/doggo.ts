import type { Project } from "../types";

// Ricavato dalla presentazione d'esame di Giulia (Sito/doggo2/2B_…_InterfaceInteraction.pdf)
// e dai mockup della landing nella stessa cartella. I testi sono quelli scritti da Giulia
// (6 ottobre 2026): il brief e il racconto in sezioni (`story`) con problema, ricerca,
// persone, funzionalità, architettura, visual identity e chiusura. L'inglese è una
// traduzione da rileggere.
// Le schermate dell'app sono pagine del PDF; i mockup sono ritagliati sul dispositivo.
// DA CONFERMARE: `date`, `tools` e `areas`.
export const doggo: Project = {
  slug: "doggo",
  category: "academy",
  areas: ["ui-ux", "art-direction"],
  // L'anno è nei testi di Giulia (2022); il mese è ancora da precisare
  date: "2022-01",
  // L'arancione dei pulsanti dell'app
  accent: "#FE6B28",
  cover: "doggo_cover",
  // La foto della copertina del PDF: cani al guinzaglio in un parco
  introImage: "doggo_hero",
  // Dal wireframe all'app: le schermate di Giulia (iPhone, 1125×2436), una coppia per schermata
  // nell'ordine del percorso: onboarding, verifica, Esplora. Tolte su richiesta di Giulia
  // registrazione, credenziali inserite e «Ci siamo quasi». Sta subito dopo i
  // wireframe. Nella prima coppia il wireframe è quello di «Iniziare è una passeggiata»,
  // l'app «Unisciti a Doggo»: è la coppia che ha mandato Giulia
  compare: {
    before: "doggo_cmp_benvenuto_wf",
    after: "doggo_cmp_benvenuto_app",
    more: [
      { before: "doggo_cmp_profilo_wf", after: "doggo_cmp_profilo_app" },
      { before: "doggo_cmp_passeggiata_wf", after: "doggo_cmp_passeggiata_app" },
      { before: "doggo_cmp_salta_wf", after: "doggo_cmp_salta_app" },
      { before: "doggo_cmp_codice_wf", after: "doggo_cmp_codice_app" },
      { before: "doggo_cmp_completata_wf", after: "doggo_cmp_completata_app" },
      { before: "doggo_cmp_esplora_wf", after: "doggo_cmp_esplora_app" },
      { before: "doggo_cmp_luoghi_wf", after: "doggo_cmp_luoghi_app" },
    ],
    frame: "phone",
  },
  layout: "case",
  case: {
    // La tavola di Giulia: marchio, palette, icone, card sorting di app e landing page,
    // architettura dell'informazione
    moodboard: "doggo_moodboard",
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
      // Primi passi: il carosello delle foto dell'app in mano (Esplora, Vicino a te, i luoghi
      // degli amici, i podcast), ritagliate in verticale sul telefono, poi onboarding e profilo.
      // La tavola di presentazione (doggo_1) è stata tolta su richiesta di Giulia
      {
        columns: 2,
        // Scorre da solo, su richiesta di Giulia
        autoplay: true,
        carousel: [
          "doggo_mano_esplora",
          "doggo_mano_vicino",
          "doggo_mano_amici",
          "doggo_mano_podcast",
        ],
        // Onboarding e profilo affiancati e senza cornice: a tutta larghezza il profilo
        // (1696 px) si vedeva sgranato
        bare: true,
        tiles: [{ key: "doggo_onboarding" }, { key: "doggo_profilo" }],
      },
      // Trovare un posto: mappa e ricerca. Esplora è stata tolta su richiesta di Giulia, perché
      // ripeteva quello che si vede già nel carosello e nel confronto
      {
        columns: 2,
        tiles: [
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
      subtitle: "L’app che ti permette di organizzare le giornate con il tuo amico a quattro zampe.",
      kind: "App iOS + Landing page",
      made: "Interfaccia dell’app, landing page per desktop, tablet e smartphone, prototipo navigabile",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Doggo è un’applicazione dedicata a chi non vuole lasciare il proprio cane a casa. Permette di trovare, visitare e prenotare luoghi esclusivamente pet-friendly: ristoranti, parchi, spiagge, eventi, servizi.\nIl progetto comprende l’app iOS, dalla ricerca fino all’interfaccia finale, e una landing page di presentazione in versione desktop, tablet e smartphone, pensata per un’unica azione: scaricare l’app.",
      compare: {
        title: "Dal wireframe alla UI",
        caption:
          "I wireframe hanno fissato struttura e gerarchie. La UI ha aggiunto il carattere: colore, fotografie e forme morbide trasformano un flusso funzionale in un’esperienza che sorride.",
        beforeLabel: "Wireframe",
        afterLabel: "App",
        label: "Benvenuto",
        beforeAlt: "Wireframe in grigi: il primo passo dell’onboarding",
        afterAlt: "Schermata dell’app: «Unisciti a Doggo!» con un cane che fa l’occhiolino su fondo bianco, i tre pallini e il pulsante arancione «Avanti»",
        more: [
          {
            label: "Crea un profilo",
            beforeAlt: "Wireframe in grigi: «Crea un profilo», con il testo, i pallini e il pulsante «Crea ora»",
            afterAlt: "Schermata dell’app: «Crea un profilo» sopra il primo piano di un corgi con la lingua fuori, e i pulsanti «Crea ora» e «Crea in seguito»",
          },
          {
            label: "Iniziare è una passeggiata",
            beforeAlt: "Wireframe in grigi: «Iniziare è una passeggiata!», con il testo e il pulsante «Iniziamo»",
            afterAlt: "Schermata dell’app: «Iniziare è una passeggiata!» in bianco sulla foto di un border collie con il guinzaglio rosso in bocca, e il pulsante «Iniziamo»",
          },
          {
            label: "Salta il tutorial",
            beforeAlt: "Wireframe in grigi: la finestra «Sei sicuro di voler saltare il tutorial?» con «Continua a guardare» e «Salta il tutorial»",
            afterAlt: "Schermata dell’app: la finestra «Sei sicuro di voler saltare il tutorial di Doggo?» con i pulsanti «Sì» e «No», sopra il profilo sfocato",
          },
          {
            label: "Codice inserito",
            beforeAlt: "Wireframe in grigi: il codice inserito e il pulsante «OK»",
            afterAlt: "Schermata dell’app: il codice inserito nei cerchi gialli, il carlino e i pulsanti «Avanti» e «Reinvia email»",
          },
          {
            label: "Registrazione completata",
            beforeAlt: "Wireframe in grigi: «Registrazione completata!» con dei cerchi concentrici grigi e il pulsante «Inizia»",
            afterAlt: "Schermata dell’app: «Registrazione completata!» con dei cerchi arancioni e gialli disegnati a mano, un’onda gialla e il pulsante «Iniziamo»",
          },
          {
            label: "Esplora",
            beforeAlt: "Wireframe in grigi: la schermata Esplora: posizione, filtri, un’illustrazione di un cane e i luoghi vicini",
            afterAlt: "Schermata dell’app: la schermata Esplora con i pulsanti gialli delle categorie e la foto di un cane sulla spiaggia, con la barra Esplora, Cerca, Pianifica, Cuccia",
          },
          {
            label: "Luoghi e smarrimenti",
            beforeAlt: "Wireframe in grigi: i filtri, i luoghi che piacciono agli amici e la bacheca smarrimenti, con immagini segnaposto",
            afterAlt: "Schermata dell’app: le schede di Lago di Bracciano e Baubeach con stelle e distanza, e la bacheca smarrimenti con le foto di Pippi e Bimba",
          },
        ],
      },
      case: {
        moodboardAlt:
          "Moodboard di Doggo su fondo a quadretti: il marchio giallo con le orecchie bianche e arancioni, il logo su bianco, la palette nero, bianco, arancione #FE6B28 e giallo #FFD217, le icone delle categorie e della barra, il card sorting MoSCoW dell’app e della landing page e l’architettura dell’informazione",
        story: [
          {
            at: "intro",
            title: "Il problema",
            blocks: [
              "Uscire con il proprio cane, troppo spesso, è una questione di logistica. Si cercano le strutture online, si telefona per chiedere se il cane è ammesso e alla fine si rischia comunque di doverlo lasciare a casa, anche in vacanza.",
              "Il 43% dei padroni intervistati indica come difficoltà principale trovare un luogo adatto.",
            ],
          },
          {
            at: "intro",
            title: "La ricerca",
            blocks: [
              "Sono partita da sondaggi e interviste. Per il 60% dei padroni poter portare il cane ovunque è molto importante. Dai dati sono emerse tre fasce d’età (16–24, 25–44, over 45) e quattro profili di utenti con esigenze diverse.",
              { quote: "L’insight: non è la voglia di tornare a casa dal proprio cane, ma il desiderio di portarlo con sé nella vita di tutti i giorni." },
              "I padroni sanno che il cane è un animale intelligente: condividere esperienze rafforza il legame e ne protegge la salute, sia fisica sia mentale. L’obiettivo di Doggo è avvicinare a questa idea anche il restante 40%, chi pensa ancora di non poter vivere i momenti di svago insieme al proprio animale.",
            ],
          },
          {
            at: "intro",
            title: "Le persone",
            blocks: [
            ],
            cards: [
              { title: "Giulia, 22", meta: "Roma", text: "Porta Charlie ovunque può, ma perde troppo tempo a cercare posti dove sia il benvenuto." },
              { title: "Andrea, 19", meta: "Catania", text: "Ha due pitbull e, per i pregiudizi sulla razza, cerca spazi aperti dove possano giocare liberi." },
              { title: "Claudia, 32", meta: "Firenze", text: "Vorrebbe portare Lilly a cena con gli amici, ma non sa mai se sarà accettata né quali cani incontrerà." },
              { title: "Franco, 67", meta: "Milano", text: "In pensione, fa volontariato in canile. Non libera mai Francis al parco perché non sa come reagirà agli altri cani." },
            ],
          },
          {
            at: "intro",
            title: "Dalle esigenze alle funzionalità",
            blocks: [
              "Con il card sorting ho trasformato i bisogni emersi in priorità. Sono diventati essenziali una mappa dei luoghi al chiuso e all’aperto, i segnalatori di cestini e fontanelle aggiornati dalla community, un profilo per ogni cane con i suoi dati anche medici e la possibilità di sapere quali altri cani sono presenti in una struttura.",
              "Altrettanto importante è stato decidere cosa non fare: niente chat, niente compravendita di cani, niente posizione degli altri utenti sulla mappa. Doggo resta uno strumento per vivere esperienze, non un social network.",
            ],
          },
          {
            at: "intro",
            title: "Architettura e flusso",
            blocks: [
              "L’app si organizza in quattro aree: Esplora, Cerca, Pianifica e Profilo. Il flusso principale è lineare: l’utente si registra con l’email, completa il suo profilo e aggiunge quello del suo cane. Da lì può esplorare, cercare sulla mappa e salvare o prenotare i luoghi.",
            ],
          },
          {
            at: "output",
            title: "Visual identity",
            blocks: [
              "Minimale e giocosa. Sono i due aggettivi su cui si basa ogni scelta grafica.",
              "Una base bianca garantisce chiarezza, mentre giallo e arancione danno energia ai punti chiave. Le icone outline e le forme amorfe alleggeriscono l’interfaccia senza renderla banale. Le fotografie di cani, vivaci e ironiche, raccontano il carattere di Doggo meglio di qualsiasi parola.",
              "L’obiettivo era trasmettere semplicità, gioia e curiosità: le stesse emozioni che i nostri cani trasmettono a noi.",
            ],
            cards: [
              { title: "Poppins", meta: "titoli", text: "Geometrica e tonda." },
              { title: "Be Vietnam", meta: "testi", text: "Neo-grotesk molto leggibile." },
              { title: "Adelle Sans", meta: "web", text: "Solida e flessibile." },
            ],
          },
          {
            at: "end",
            title: "Chiusura",
            blocks: [
              { quote: "Doggo nasce da un’idea semplice: un cane non è qualcosa da lasciare a casa, ma un compagno con cui vivere la giornata. Il mio lavoro è stato rendere questa idea facile, a portata di zampa." },
            ],
          },
        ],
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
            carousel: [
              { caption: "Esplora", alt: "Una persona tiene in mano un telefono con la schermata Esplora di Doggo: le categorie in pulsanti gialli e la foto di un cane sulla spiaggia" },
              { caption: "Vicino a te", alt: "Un telefono in mano con la sezione «Vicino a te»: la scheda del ristorante D’incanti, cucina italiana, aperto ora a 0,5 km, e sotto «Podcast del momento»" },
              { caption: "I luoghi degli amici", alt: "Un telefono in mano con «Luoghi che piacciono ai tuoi amici»: le schede del Lago di Bracciano e di Baubeach, con descrizione e stelle" },
              { caption: "Podcast del momento", alt: "Un telefono in mano con «Podcast del momento»: le copertine «Doggo Care» e «Travestiamoci» con i numeri 1 e 2 in giallo" },
            ],
            tiles: [
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
            text: "La landing presenta Doggo in pochi passaggi chiari e accompagna l’utente verso un solo obiettivo: scaricare l’app. È progettata in versione desktop, tablet e smartphone, con prototipo navigabile.",
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
      subtitle: "The app that lets you plan your days with your four-legged friend.",
      kind: "iOS app + Landing page",
      made: "App interface, landing page for desktop, tablet and smartphone, clickable prototype",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Doggo is an app for people who don’t want to leave their dog at home. It lets you find, visit and book places that are strictly pet-friendly: restaurants, parks, beaches, events, services.\nThe project covers the iOS app, from research to the final interface, and a landing page in desktop, tablet and smartphone versions, designed for a single action: downloading the app.",
      compare: {
        title: "From wireframe to UI",
        caption:
          "The wireframes set the structure and the hierarchy. The UI added the character: colour, photography and soft shapes turn a functional flow into an experience that smiles.",
        beforeLabel: "Wireframe",
        afterLabel: "App",
        label: "Welcome",
        beforeAlt: "Greyscale wireframe: the first onboarding step",
        afterAlt: "App screen: “Join Doggo!” with a winking dog on white, the three dots and the orange “Next” button",
        more: [
          {
            label: "Create a profile",
            beforeAlt: "Greyscale wireframe: “Create a profile”, with the text, the dots and the “Create now” button",
            afterAlt: "App screen: “Create a profile” over a close-up of a corgi sticking its tongue out, with the “Create now” and “Create later” buttons",
          },
          {
            label: "Getting started is a walk",
            beforeAlt: "Greyscale wireframe: “Getting started is a walk!”, with the text and the “Let’s start” button",
            afterAlt: "App screen: “Getting started is a walk!” in white over a photo of a border collie with a red leash in its mouth, and the “Let’s start” button",
          },
          {
            label: "Skip the tutorial",
            beforeAlt: "Greyscale wireframe: the “Are you sure you want to skip the tutorial?” dialog with “Keep watching” and “Skip the tutorial”",
            afterAlt: "App screen: the “Are you sure you want to skip the Doggo tutorial?” dialog with “Yes” and “No” buttons, over the blurred profile",
          },
          {
            label: "Code entered",
            beforeAlt: "Greyscale wireframe: the code entered and the “OK” button",
            afterAlt: "App screen: the code entered in the yellow circles, the pug and the “Next” and “Resend email” buttons",
          },
          {
            label: "Sign-up complete",
            beforeAlt: "Greyscale wireframe: “Sign-up complete!” with grey concentric circles and the “Start” button",
            afterAlt: "App screen: “Sign-up complete!” with hand-drawn orange and yellow circles, a yellow wave and the “Let’s start” button",
          },
          {
            label: "Explore",
            beforeAlt: "Greyscale wireframe: the Explore screen: location, filters, a dog illustration and places nearby",
            afterAlt: "App screen: the Explore screen with the yellow category buttons and a photo of a dog on the beach, with the Explore, Search, Plan, Kennel bar",
          },
          {
            label: "Places and lost dogs",
            beforeAlt: "Greyscale wireframe: filters, places your friends like and the lost dogs board, with placeholder images",
            afterAlt: "App screen: the Lago di Bracciano and Baubeach cards with stars and distance, and the lost dogs board with photos of Pippi and Bimba",
          },
        ],
      },
      case: {
        moodboardAlt:
          "Doggo moodboard on a grid background: the yellow logo with white and orange ears, the logo on white, the black, white, orange #FE6B28 and yellow #FFD217 palette, the category and tab bar icons, the MoSCoW card sorting for the app and the landing page, and the information architecture",
        story: [
          {
            at: "intro",
            title: "The problem",
            blocks: [
              "Going out with your dog is, far too often, a matter of logistics. You look places up online, call to ask whether dogs are allowed, and in the end you may still have to leave yours at home, even on holiday.",
              "43% of the owners interviewed say their main difficulty is finding a suitable place.",
            ],
          },
          {
            at: "intro",
            title: "The research",
            blocks: [
              "I started from surveys and interviews. For 60% of owners, being able to take their dog anywhere really matters. The data revealed three age groups (16–24, 25–44, over 45) and four user profiles with different needs.",
              { quote: "The insight: it isn’t the urge to get home to your dog, but the wish to bring it along in everyday life." },
              "Owners know dogs are intelligent animals: sharing experiences strengthens the bond and protects their health, both physical and mental. Doggo’s goal is to bring the remaining 40% closer to this idea too, those who still think they can’t enjoy their free time together with their pet.",
            ],
          },
          {
            at: "intro",
            title: "The people",
            blocks: [
            ],
            cards: [
              { title: "Giulia, 22", meta: "Rome", text: "Takes Charlie everywhere she can, but wastes too much time looking for places where he’s welcome." },
              { title: "Andrea, 19", meta: "Catania", text: "Has two pit bulls and, because of prejudice against the breed, looks for open spaces where they can play freely." },
              { title: "Claudia, 32", meta: "Florence", text: "Would like to take Lilly to dinner with friends, but never knows whether she’ll be accepted or which dogs she’ll meet." },
              { title: "Franco, 67", meta: "Milan", text: "Retired, he volunteers at a dog shelter. He never lets Francis off the lead at the park because he doesn’t know how he’ll react to other dogs." },
            ],
          },
          {
            at: "intro",
            title: "From needs to features",
            blocks: [
              "With card sorting I turned the needs that emerged into priorities. The essentials became a map of indoor and outdoor places, markers for bins and water fountains updated by the community, a profile for every dog including its medical details, and the ability to know which other dogs are at a venue.",
              "Deciding what not to do was just as important: no chat, no buying or selling dogs, no other users’ locations on the map. Doggo stays a tool for living experiences, not a social network.",
            ],
          },
          {
            at: "intro",
            title: "Architecture and flow",
            blocks: [
              "The app is organised into four areas: Explore, Search, Plan and Profile. The main flow is linear: users sign up with their email, complete their profile and add their dog’s. From there they can explore, search on the map and save or book places.",
            ],
          },
          {
            at: "output",
            title: "Visual identity",
            blocks: [
              "Minimal and playful. These are the two words behind every design choice.",
              "A white base keeps things clear, while yellow and orange bring energy to the key points. Outline icons and amorphous shapes lighten the interface without making it bland. Photos of dogs, lively and ironic, tell Doggo’s personality better than any words.",
              "The aim was to convey simplicity, joy and curiosity: the same emotions our dogs give us.",
            ],
            cards: [
              { title: "Poppins", meta: "headings", text: "Geometric and round." },
              { title: "Be Vietnam", meta: "body text", text: "A highly readable neo-grotesque." },
              { title: "Adelle Sans", meta: "web", text: "Solid and flexible." },
            ],
          },
          {
            at: "end",
            title: "Closing",
            blocks: [
              { quote: "Doggo comes from a simple idea: a dog isn’t something you leave at home, but a companion to share the day with. My job was to make that idea easy, within paw’s reach." },
            ],
          },
        ],
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
            carousel: [
              { caption: "Explore", alt: "A person holding a phone showing Doggo’s Explore screen: the categories as yellow buttons and a photo of a dog on the beach" },
              { caption: "Near you", alt: "A phone in hand showing “Near you”: the card for the restaurant D’incanti, Italian cuisine, open now 0.5 km away, and below “Trending podcasts”" },
              { caption: "Places your friends like", alt: "A phone in hand showing “Places your friends like”: the Lago di Bracciano and Baubeach cards, with description and stars" },
              { caption: "Trending podcasts", alt: "A phone in hand showing “Trending podcasts”: the covers “Doggo Care” and “Travestiamoci” with the numbers 1 and 2 in yellow" },
            ],
            tiles: [
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
            text: "The landing page introduces Doggo in a few clear steps and guides the user towards a single goal: downloading the app. It is designed for desktop, tablet and smartphone, with a clickable prototype.",
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
