import type { Project } from "../types";

// Progetto finale del corso AANT: l'identità per «il portale dell'olio», un portale di
// oleoturismo. Materiali in Sito/goliosi/: il brief del docente (PROGETTO FINALE BRIEF.pdf),
// i marchi, i mockup di fiera e merchandising e la tavola Instagram (dal PDF da 161 MB, escluso
// da git). I testi sono una BOZZA ricavata dal brief: da rileggere. Da confermare anche
// `tools` e il mese di `date` (giugno: la presentazione al cliente era a metà mese)
export const goliosi: Project = {
  slug: "goliosi",
  category: "academy",
  areas: ["branding", "art-direction", "social"],
  date: "2025-06",
  // Il verde del marchio, campionato dalla spirale
  accent: "#9FC632",
  // PROVVISORIA: la tavola Brand identity, finché non c'è una cover come le altre
  // (Sito/Cover_*.jpg, logo a sinistra e foto a destra)
  cover: "goliosi_brand",
  // L'uliveto, dagli scatti della tavola Instagram: niente logo dietro il titolo
  introImage: "goliosi_hero",
  layout: "case",
  case: {
    // Manca la moodboard: per ora c'è il segnaposto
    // La tavola Brand identity in grande, accanto il marchio e il marchio con il payoff,
    // su bianco perché la scritta è nera e sparirebbe sul fondo scuro
    identity: [
      { key: "goliosi_brand", cols: 2, rows: 2 },
      { key: "goliosi_marchio" },
      { key: "goliosi_payoff" },
    ],
    output: [],
    // Tutti i mockup sono ritagliati in 16:9 da Sito/goliosi/, tenendo le insegne in alto
    outputGroups: [
      // Fiere: lo stand in fiera in grande, accanto il pannello della convention e lo stand
      // su fondo neutro
      {
        tiles: [
          { key: "goliosi_fiera_1", cols: 2, rows: 2 },
          { key: "goliosi_fiera_2" },
          { key: "goliosi_stand" },
        ],
      },
      // Merchandising e packaging: le confezioni regalo in grande, poi gli altri cinque.
      // 2×2 più 5 riquadri singoli riempiono tre righe da tre senza buchi
      {
        tiles: [
          { key: "goliosi_regalo", cols: 2, rows: 2 },
          { key: "goliosi_oliera" },
          { key: "goliosi_spedizione" },
          { key: "goliosi_shopper" },
          { key: "goliosi_shopper_2" },
          { key: "goliosi_mestolo" },
        ],
      },
      // Social: la tavola dei tre telefoni, a tutta larghezza
      { columns: 2, tiles: [{ key: "goliosi_social", cols: 2, rows: 2 }] },
    ],
  },
  // Non usate dal mastro: restano come elenco delle tavole del progetto
  images: [{ key: "goliosi_brand" }, { key: "goliosi_social" }],
  content: {
    it: {
      title: "Goliosi",
      // BOZZA da rileggere
      subtitle: "L’identità del primo portale dell’oleoturismo: golosi di olio, di sapere, di esperienze.",
      kind: "Brand identity",
      made: "Naming, marchio, stile, materiali per le fiere, merchandising, social",
      tools: "Illustrator, Photoshop",
      intro:
        "Nel 2020 la legge di Bilancio ha riconosciuto per la prima volta l’oleoturismo, al pari dell’enoturismo: visite in frantoio e negli uliveti, degustazioni, corsi. Nel vino esistono portali che offrono queste esperienze, nell’olio ancora no. Il brief chiedeva l’identità di questo portale: nome, marchio, uno stile completo e i materiali per le fiere e il merchandising, per un pubblico che va dagli appassionati di olio EVO ai frantoi e ai produttori che offrono i loro servizi.",
      insight:
        "Chi ama l’olio non cerca solo un prodotto: vuole sapere da dove viene, conoscere chi lo fa, viverlo.",
      // BOZZA da rileggere: il concept
      concept:
        "Goliosi è un neologismo: golosi, ma di olio. Dà un nome a una comunità che ancora non ne aveva, quella degli appassionati, golosi di olio, di sapere e di esperienze. Il payoff, «Just for EVO lovers», parla a loro. Il marchio è una spirale verde che si avvolge su sé stessa, accanto a un lettering pulito: un segno che tiene insieme la tradizione dell’olio e un modo nuovo di raccontarlo, da condimento ad alimento, da tradizione a innovazione.",
      case: {
        identity: [
          {
            label: "Brand identity",
            alt: "Il marchio Goliosi bianco su un riquadro verde con la griglia di costruzione e le proporzioni, sopra la home del portale, accanto a una escursionista a braccia aperte davanti alle colline",
          },
          {
            label: "Marchio",
            alt: "Il marchio Goliosi: una spirale verde e la scritta Goliosi in nero, su fondo bianco",
          },
          {
            label: "Marchio e payoff",
            alt: "Il marchio Goliosi con sotto il payoff «Just for EVO lovers», su fondo bianco",
          },
        ],
        // BOZZA da rileggere: i testi dei gruppi
        output: [],
        outputGroups: [
          {
            title: "Fiere",
            text: "Il portale si presenta alle fiere di settore con uno stand modulare: i pannelli verdi riprendono la spirale del marchio e le foto di olio e uliveti, al centro un tavolo per le degustazioni e un banco con le bottiglie.",
            tiles: [
              {
                label: "In fiera",
                alt: "Lo stand Goliosi in un padiglione affollato: pannelli verdi con la spirale e foto di olio e olive, l’insegna in alto, un tavolo con bottiglie e un banco per le degustazioni",
              },
              {
                label: "Convention",
                alt: "Lo spazio Goliosi a una convention: un portale in legno con il marchio, pannelli con il programma e un tavolo con le persone sedute",
              },
              {
                label: "Lo stand",
                alt: "Lo stand Goliosi su fondo neutro: pannelli verdi con la spirale e la scritta «Just for evo», un tavolo con le sedie e un banco con le bottiglie",
              },
            ],
          },
          {
            title: "Merchandising e packaging",
            text: "La spirale passa dagli stand alla cucina: confezioni regalo e buste per le bottiglie, la scatola da spedizione, le shopper in tela naturale e verde oliva, un’oliera e un poggiamestoli in ceramica.",
            tiles: [
              {
                label: "Confezioni regalo",
                alt: "Buste regalo bianche e verdi con il marchio Goliosi e una confezione aperta con due bottiglie d’olio, su un tavolo di legno",
              },
              {
                label: "Oliera",
                alt: "Un’oliera in ceramica bianca con il marchio Goliosi in rilievo, su un canovaccio macchiato d’olio con un rametto di olive",
              },
              {
                label: "Spedizione",
                alt: "La scatola di cartone da sei bottiglie con il marchio Goliosi e il payoff, su un tavolo di legno",
              },
              {
                label: "Shopper",
                alt: "Una shopper in tela naturale con il marchio Goliosi, appesa a un piolo di legno davanti a un muro di mattoni",
              },
              {
                label: "Due colori",
                alt: "Due shopper Goliosi su un bancone, una in tela naturale e una verde oliva, con i campioni dei due colori",
              },
              {
                label: "Poggiamestoli",
                alt: "Un poggiamestoli in ceramica bianca con il marchio Goliosi, con un mestolo e una forchetta di legno, sul davanzale di una cucina",
              },
            ],
          },
          {
            title: "Social",
            text: "Il profilo Instagram racconta l’olio con foto luminose di piatti, uliveti e persone, e le storie in evidenza seguono le sezioni del portale: formazione, oli, regali, tour e ospitalità.",
            tiles: [
              {
                label: "Instagram",
                alt: "Tre telefoni con il profilo Instagram di Goliosi: la pagina con le storie in evidenza, la griglia dei post con piatti, olive e uliveti, e un post con una bistecca e una ciotola d’olio",
              },
            ],
          },
        ],
      },
      coverAlt:
        "Il marchio Goliosi bianco su un riquadro verde, sopra la home del portale, accanto a una escursionista a braccia aperte davanti alle colline",
      images: [
        {
          title: "Brand identity",
          alt: "Il marchio Goliosi bianco su un riquadro verde con la griglia di costruzione, sopra la home del portale",
        },
        {
          title: "Instagram",
          alt: "Tre telefoni con il profilo Instagram di Goliosi",
        },
      ],
    },
    en: {
      title: "Goliosi",
      // DRAFT to be reviewed
      subtitle: "The identity of the first olive oil tourism portal: hungry for oil, for knowledge, for experiences.",
      kind: "Brand identity",
      made: "Naming, logo, style kit, trade fair materials, merchandising, social",
      tools: "Illustrator, Photoshop",
      intro:
        "In 2020 the Italian budget law recognised olive oil tourism for the first time, on a par with wine tourism: visits to mills and olive groves, tastings, courses. Wine has portals offering these experiences; olive oil doesn’t yet. The brief asked for this portal’s identity: name, logo, a complete style kit and the materials for trade fairs and merchandising, for an audience ranging from extra virgin olive oil lovers to the mills and producers offering their services.",
      insight:
        "People who love olive oil aren’t just looking for a product: they want to know where it comes from, meet the people who make it, live it.",
      concept:
        "Goliosi is a coined word: golosi, Italian for “greedy for food”, but for olio, oil. It names a community that didn’t have a name yet, the enthusiasts, hungry for oil, for knowledge and for experiences. The tagline, “Just for EVO lovers”, speaks to them. The logo is a green spiral winding in on itself next to clean lettering: a sign that holds together the tradition of olive oil and a new way of telling it, from condiment to food, from tradition to innovation.",
      case: {
        identity: [
          {
            label: "Brand identity",
            alt: "The Goliosi logo in white on a green panel with the construction grid and proportions, over the portal’s home page, next to a hiker with open arms in front of the hills",
          },
          {
            label: "Logo",
            alt: "The Goliosi logo: a green spiral and the word Goliosi in black, on white",
          },
          {
            label: "Logo and tagline",
            alt: "The Goliosi logo with the tagline “Just for EVO lovers” below it, on white",
          },
        ],
        output: [],
        outputGroups: [
          {
            title: "Trade fairs",
            text: "The portal shows up at industry fairs with a modular stand: green panels echo the spiral of the logo and photos of oil and olive groves, with a tasting table in the middle and a counter with the bottles.",
            tiles: [
              {
                label: "At the fair",
                alt: "The Goliosi stand in a busy exhibition hall: green panels with the spiral and photos of oil and olives, the sign above, a table with bottles and a tasting counter",
              },
              {
                label: "Convention",
                alt: "The Goliosi space at a convention: a wooden arch with the logo, panels with the programme and a table with people seated",
              },
              {
                label: "The stand",
                alt: "The Goliosi stand on a neutral background: green panels with the spiral and the words “Just for evo”, a table with chairs and a counter with bottles",
              },
            ],
          },
          {
            title: "Merchandising and packaging",
            text: "The spiral moves from the stands to the kitchen: gift boxes and bottle bags, the shipping box, tote bags in natural and olive-green canvas, a ceramic oil cruet and spoon rest.",
            tiles: [
              {
                label: "Gift boxes",
                alt: "White and green gift bags with the Goliosi logo and an open box with two bottles of oil, on a wooden table",
              },
              {
                label: "Oil cruet",
                alt: "A white ceramic oil cruet with the Goliosi logo in relief, on a cloth stained with oil next to a sprig of olives",
              },
              {
                label: "Shipping",
                alt: "The six-bottle cardboard box with the Goliosi logo and tagline, on a wooden table",
              },
              {
                label: "Tote bag",
                alt: "A natural canvas tote bag with the Goliosi logo, hanging from a wooden peg in front of a brick wall",
              },
              {
                label: "Two colours",
                alt: "Two Goliosi tote bags on a counter, one in natural canvas and one in olive green, with swatches of the two colours",
              },
              {
                label: "Spoon rest",
                alt: "A white ceramic spoon rest with the Goliosi logo, holding a ladle and a wooden fork, on a kitchen windowsill",
              },
            ],
          },
          {
            title: "Social",
            text: "The Instagram profile tells the story of olive oil through bright photos of dishes, olive groves and people, and the story highlights follow the sections of the portal: courses, oils, gifts, tours and hospitality.",
            tiles: [
              {
                label: "Instagram",
                alt: "Three phones showing the Goliosi Instagram profile: the page with story highlights, the grid of posts with dishes, olives and olive groves, and a post with a steak and a bowl of oil",
              },
            ],
          },
        ],
      },
      coverAlt:
        "The Goliosi logo in white on a green panel, over the portal’s home page, next to a hiker with open arms in front of the hills",
      images: [
        {
          title: "Brand identity",
          alt: "The Goliosi logo in white on a green panel with the construction grid, over the portal’s home page",
        },
        {
          title: "Instagram",
          alt: "Three phones showing the Goliosi Instagram profile",
        },
      ],
    },
  },
};
