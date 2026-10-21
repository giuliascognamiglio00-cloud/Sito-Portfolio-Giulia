import type { Project } from "../types";

// Mastro 1, come gli altri progetti. Dopo la moodboard la galleria del backstage, poi le tre
// edizioni una alla volta e subito dopo il confronto prima/dopo, più piccolo. Concept e insight sono una BOZZA, la bozza del portfolio non li aveva.
export const oculus: Project = {
  slug: "oculus",
  category: "academy",
  areas: ["photo", "compositing", "art-direction"],
  date: "2023-12",
  accent: "#3E78B2",
  // Il visore stretto dal tentacolo, con il salotto sfocato dietro (Sito/OCULUS/Portfolio_Oculus
  // 1.jpg): è sia la copertina nella pagina Lavori sia la foto di apertura del progetto
  cover: "oculus_cover",
  introImage: "oculus_cover",
  // Il prima è Sito/OCULUS/prima_ouculus.jpg, riallineato sull'annuncio finito (stessa scala
  // e stessa inquadratura, ritagliato a 1600×896), così trascinando la stanza non si muove
  compare: { before: "oculus_prima", after: "oculus_1" },
  layout: "case",
  case: {
    // La moodboard di Giulia: Sito/OCULUS/Moodboard Oculus – busta di plastica@2x.png
    moodboard: "oculus_moodboard",
    // La tavola del making-of è la seconda moodboard: ci si arriva col pulsante
    moodboardMore: ["oculus_4"],
    // Gli scatti del set (Sito/OCULUS/BackStage, i RAW convertiti) nell'ordine della giornata
    backstage: [
      "oculus_bs_1",
      "oculus_bs_2",
      "oculus_bs_3",
      "oculus_bs_4",
      "oculus_bs_5",
      "oculus_bs_6",
      "oculus_bs_7",
    ],
    // Le tre edizioni una alla volta: la tempesta in grande, deserto e scogliera come
    // miniature a sinistra, una sopra l'altra, da scegliere
    output: [{ key: "oculus_1" }, { key: "oculus_2" }, { key: "oculus_3" }],
    outputLayout: "switch",
    // I due tentacoli (AdobeStock in Sito/OCULUS, scontornati): uno vicino al titolo, uno
    // sopra moodboard e strumenti
    tentacles: [
      { key: "oculus_tentacolo_1", at: "title" },
      { key: "oculus_tentacolo_2", at: "tools" },
    ],
  },
  images: [{ key: "oculus_1" }, { key: "oculus_2" }, { key: "oculus_3" }],
  content: {
    it: {
      title: "Oculus",
      // BOZZA da rileggere
      subtitle: "Una campagna stampa ricostruita da zero, in cui il salotto si apre su mondi impossibili.",
      kind: "Campagna stampa",
      made: "Fotografia in studio, compositing, postproduzione",
      tools: "Photoshop",
      intro:
        "La ricostruzione fedele di una campagna stampa per Oculus, partendo da zero: dalla ricerca dei materiali allo scatto in studio, fino al compositing finale. Tre salotti si aprono su ambienti impossibili, una tempesta, un deserto, una scogliera, con il claim «The new surround allows you to be present.»",
      // BOZZA da rileggere
      concept:
        "La realtà virtuale non ti porta altrove: porta l’altrove dentro casa tua. Il salotto resta riconoscibile, ma una parete si apre su un mare in tempesta, un deserto, una scogliera, e chi indossa il visore ci si butta dentro con tutto il corpo.",
      insight:
        "Chi prova un visore per la prima volta reagisce con il corpo: si sporge, si scansa, allunga le mani verso quello che vede.",
      compare: {
        title: "Il processo",
        caption: "Il soggetto scontornato e montato nel salotto con gli altri elementi, poi la postproduzione che fonde tutto in un’unica immagine.",
        beforeAlt:
          "La scena prima della postproduzione: la persona con il visore, la lampada, il polpo e gli scogli scontornati con un bordo bianco sopra il salotto e il mare",
        afterAlt:
          "L’annuncio finito: un salotto blu in cui una persona con il visore fluttua accanto a un mare in tempesta con un polpo gigante",
      },
      case: {
        moodboardAlt:
          "Moodboard di Oculus dentro una busta di plastica: il salotto con la libreria, un granchio su uno scoglio, il visore e i controller, un polpo, due tentacoli, le piante, la lampada, un portatile e uno spruzzo d’acqua, attorno a un annuncio di riferimento con un salotto invaso dal mare",
        moodboardMore: [
          {
            label: "Making-of",
            alt: "La tavola del making-of: una mano con lo smartphone inquadra la scena, accanto ai livelli fotografici assemblati",
          },
        ],
        // BOZZA da rileggere: le didascalie del backstage
        backstage: {
          title: "Backstage",
          text: "Lo scatto è avvenuto in università. Tre soggetti, tra cui io, sono stati fotografati in varie pose sospese, tenuti a braccia o distesi su un cubo; poi li ho scontornati in postproduzione e inseriti in contesti diversi, seguendo un immaginario comune.",
          items: [
            {
              caption: "In posa sul cubo, con la luce di taglio.",
              alt: "Sul set fotografico una ragazza con il visore e la tuta da tigre è distesa a pancia in giù su un cubo nero, come in volo, tra le luci da studio",
            },
            {
              caption: "Il volo, tenuto in braccio.",
              alt: "Due ragazzi sollevano in orizzontale una ragazza in pigiama a fiori, mentre altri sistemano le luci",
            },
            {
              caption: "Un altro soggetto, un’altra posa.",
              alt: "Una ragazza con il visore viene sorretta in orizzontale da un ragazzo davanti a una grande parabola luminosa",
            },
            {
              caption: "Lo scatto di prova prima del compositing.",
              alt: "Una ragazza in pigiama a fiori con il visore distesa su un cubo nero, con un pannello azzurro tenuto sotto di lei",
            },
            {
              caption: "Primo piano: la reazione conta più della posa.",
              alt: "Primo piano di una ragazza con il visore e le braccia aperte, illuminata da una parabola con una corona di luci",
            },
            {
              caption: "Le mani sull’asta della lampada.",
              alt: "Una ragazza con il visore stringe un’asta tenuta da una mano tatuata, in penombra",
            },
            {
              caption: "Si controllano gli scatti al computer.",
              alt: "Un gruppo di ragazzi guarda gli scatti sullo schermo di un portatile in studio",
            },
          ],
        },
        output: [
          {
            label: "Tempesta",
            alt: "Un salotto blu in cui una persona con il visore fluttua accanto a un mare in tempesta con un polpo gigante",
          },
          {
            label: "Deserto",
            alt: "Un salotto verde in cui una persona con il visore fluttua verso un elefante nel deserto",
          },
          {
            label: "Scogliera",
            alt: "Un salotto viola in cui una persona con il visore fluttua accanto a un’aquila davanti a una scogliera",
          },
        ],
      },
      coverAlt:
        "Un visore Oculus e i suoi controller stretti da un tentacolo che esce dall’acqua, con un salotto sfocato sullo sfondo",
      images: [
        {
          title: "Tempesta",
          caption: "Il salotto incontra un mare in tempesta e un polpo gigante.",
          alt: "Un salotto blu in cui una persona con il visore fluttua accanto a un mare in tempesta con un polpo gigante",
        },
        {
          title: "Deserto",
          caption: "Un elefante entra nel salotto verde.",
          alt: "Un salotto verde in cui una persona con il visore fluttua verso un elefante nel deserto",
        },
        {
          title: "Scogliera",
          caption: "Un’aquila sorvola il salotto viola.",
          alt: "Un salotto viola in cui una persona con il visore fluttua accanto a un’aquila davanti a una scogliera",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Oculus",
      subtitle: "A print campaign rebuilt from scratch, where the living room opens onto impossible worlds.",
      kind: "Print campaign",
      made: "Studio photography, compositing, post-production",
      tools: "Photoshop",
      intro:
        "A faithful reconstruction of a print campaign for Oculus, starting from scratch: from sourcing the materials to the studio shoot and the final compositing. Three living rooms open onto impossible places, a storm, a desert, a cliff, with the claim “The new surround allows you to be present.”",
      concept:
        "Virtual reality doesn’t take you somewhere else: it brings somewhere else into your home. The living room stays recognisable, but one wall opens onto a stormy sea, a desert, a cliff, and whoever wears the headset dives in with their whole body.",
      insight:
        "People trying a headset for the first time react with their body: they lean in, dodge, reach out for what they see.",
      compare: {
        title: "The process",
        caption: "The subject cut out and placed in the living room with the other elements, then the post-production that blends everything into a single image.",
        beforeAlt:
          "The scene before post-production: the person in the headset, the lamp, the octopus and the rocks cut out with a white outline over the living room and the sea",
        afterAlt:
          "The finished ad: a blue living room where a person wearing a headset floats next to a stormy sea with a giant octopus",
      },
      case: {
        moodboardAlt:
          "Oculus moodboard inside a plastic sleeve: the living room with the bookcase, a crab on a rock, the headset and controllers, an octopus, two tentacles, the plants, the lamp, a laptop and a splash of water, around a reference ad of a living room flooded by the sea",
        moodboardMore: [
          {
            label: "Making-of",
            alt: "The making-of board: a hand holding a smartphone frames the scene, next to the assembled photographic layers",
          },
        ],
        backstage: {
          title: "Backstage",
          text: "The shoot took place at university. Three subjects, me among them, were photographed in a range of mid-air poses, held up by hand or lying on a box; I then cut them out in post-production and placed them in different settings, following a shared visual world.",
          items: [
            {
              caption: "Posing on the box, with side lighting.",
              alt: "On the photo set a girl wearing the headset and a tiger onesie lies face down on a black box, as if flying, among the studio lights",
            },
            {
              caption: "Flying, held up by hand.",
              alt: "Two boys hold a girl in flowery pyjamas horizontally, while others adjust the lights",
            },
            {
              caption: "Another subject, another pose.",
              alt: "A girl wearing the headset is held horizontally by a boy in front of a large light reflector",
            },
            {
              caption: "The test shot before compositing.",
              alt: "A girl in flowery pyjamas wearing the headset lies on a black box, with a light-blue panel held beneath her",
            },
            {
              caption: "Close-up: the reaction matters more than the pose.",
              alt: "Close-up of a girl wearing the headset with her arms wide open, lit by a reflector ringed with lights",
            },
            {
              caption: "Hands on the lamp pole.",
              alt: "A girl wearing the headset grips a pole held by a tattooed hand, in low light",
            },
            {
              caption: "Checking the shots on the laptop.",
              alt: "A group of students looks at the shots on a laptop screen in the studio",
            },
          ],
        },
        output: [
          {
            label: "Storm",
            alt: "A blue living room where a person wearing a headset floats next to a stormy sea with a giant octopus",
          },
          {
            label: "Desert",
            alt: "A green living room where a person wearing a headset floats toward an elephant in the desert",
          },
          {
            label: "Cliff",
            alt: "A purple living room where a person wearing a headset floats next to an eagle in front of a cliff",
          },
        ],
      },
      coverAlt:
        "An Oculus headset and its controllers gripped by a tentacle rising from the water, with a blurred living room in the background",
      images: [
        {
          title: "Storm",
          caption: "The living room meets a stormy sea and a giant octopus.",
          alt: "A blue living room where a person wearing a headset floats next to a stormy sea with a giant octopus",
        },
        {
          title: "Desert",
          caption: "An elephant walks into the green living room.",
          alt: "A green living room where a person wearing a headset floats toward an elephant in the desert",
        },
        {
          title: "Cliff",
          caption: "An eagle soars over the purple living room.",
          alt: "A purple living room where a person wearing a headset floats next to an eagle in front of a cliff",
        },
      ],
    },
  },
};
