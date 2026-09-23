import type { Project } from "../types";

export const theLastOfUs: Project = {
  slug: "the-last-of-us",
  category: "academy",
  areas: ["campaign", "social"],
  date: "2024-03",
  accent: "#8FA36B",
  cover: "tlou_thumb",
  // L'infetto nel buio: quasi tutto nero, il testo chiaro sopra si stacca benissimo.
  // Non compare in galleria, così non si vede due volte nella stessa pagina
  introImage: "tlou_thumb",
  images: [{ key: "tlou_1" }, { key: "tlou_2" }, { key: "tlou_3" }],
  content: {
    it: {
      title: "The Last of Us, stagione 2",
      kind: "Campagna integrata",
      made: "Affissione, social",
      tools: "Photoshop",
      intro:
        "Campagna integrata per l’uscita della seconda stagione di The Last of Us. Affissioni e social partono da un’idea semplice: gli oggetti che ci portiamo dietro dicono chi siamo.",
      insight:
        "Gli oggetti sono un pezzo della nostra vita, una parte di noi che non vorremmo mai dimenticare.",
      concept: "Ciò che ci portiamo dietro definisce chi siamo.",
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
      kind: "Integrated campaign",
      made: "Out-of-home, social",
      tools: "Photoshop",
      intro:
        "Integrated campaign for the launch of The Last of Us season 2. Posters and social posts start from a simple idea: the things we carry with us say who we are.",
      insight:
        "Objects are a piece of our life, a part of us we would never want to forget.",
      concept: "What we carry with us defines who we are.",
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
