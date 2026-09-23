import type { Project } from "../types";

export const oculus: Project = {
  slug: "oculus",
  category: "academy",
  areas: ["photo", "compositing", "art-direction"],
  date: "2023-12",
  accent: "#3E78B2",
  cover: "oculus_thumb",
  // Stanza in notturna con i tentacoli: la parte alta è scura e uniforme
  introImage: "oculus_1",
  // La tavola del making-of sta qui, non in galleria: si confronta con l'annuncio finito
  compare: { before: "oculus_4", after: "oculus_thumb" },
  gallery: "stagger",
  images: [{ key: "oculus_1" }, { key: "oculus_2" }, { key: "oculus_3" }],
  content: {
    it: {
      title: "Oculus",
      kind: "Campagna stampa",
      made: "Fotografia in studio, compositing, postproduzione",
      tools: "Photoshop",
      intro:
        "Campagna stampa per Oculus realizzata in compositing. I soggetti sono stati fotografati in studio e inseriti in tre salotti che si aprono su ambienti impossibili: una tempesta, un deserto, una scogliera. Il claim: «The new surround allows you to be present.»",
      coverAlt:
        "Un salotto blu in cui una persona con il visore fluttua accanto a un mare in tempesta con un polpo gigante",
      compare: {
        title: "Il processo",
        caption: "Dallo scatto in studio al montaggio degli elementi.",
        beforeAlt:
          "Una mano con lo smartphone inquadra la scena, accanto ai livelli fotografici assemblati",
        afterAlt:
          "Un salotto blu in cui una persona con il visore fluttua accanto a un mare in tempesta con un polpo gigante",
      },
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
      kind: "Print campaign",
      made: "Studio photography, compositing, post-production",
      tools: "Photoshop",
      intro:
        "Print campaign for Oculus, built through compositing. The subjects were photographed in the studio and placed in three living rooms that open onto impossible places: a storm, a desert, a cliff. The claim: “The new surround allows you to be present.”",
      coverAlt:
        "A blue living room where a person wearing a headset floats next to a stormy sea with a giant octopus",
      compare: {
        title: "The process",
        caption: "From the studio shot to assembling the elements.",
        beforeAlt:
          "A hand holding a smartphone frames the scene, next to the assembled photographic layers",
        afterAlt:
          "A blue living room where a person wearing a headset floats next to a stormy sea with a giant octopus",
      },
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
