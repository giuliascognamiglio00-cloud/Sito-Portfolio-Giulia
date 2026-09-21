import type { Project } from "../types";

export const goliosi: Project = {
  slug: "goliosi",
  category: "academy",
  date: "2023-06",
  accent: "#8DBE1F",
  cover: "goliosi_thumb",
  images: [{ key: "goliosi_1" }, { key: "goliosi_2" }, { key: "goliosi_3" }],
  content: {
    it: {
      title: "Goliosi",
      kind: "Brand identity",
      made: "Logo, sito, applicazioni",
      tools: "Illustrator, Figma, Photoshop",
      intro:
        "Brand identity di Goliosi, il portale italiano dell’olio extravergine. Il logo mette insieme la cultura italiana dell’olio e le esperienze che il portale offre. Il payoff: «Just for EVO lovers».",
      coverAlt:
        "Il logo Goliosi su fondo verde lime, con il sito web e un’escursionista sullo sfondo",
      images: [
        {
          title: "Marchio e sito",
          alt: "Il logo Goliosi su fondo verde lime, con il sito web e un’escursionista sullo sfondo",
        },
        {
          title: "Il concept del logo",
          caption: "Esperienza e olio in un’unica forma.",
          alt: "Il logo Goliosi, una spirale verde, tra due mani che si avvicinano e ciotole di olive e olio",
        },
        {
          title: "Applicazioni",
          caption: "Shopper, borse, stand fieristico, biglietto da visita e social.",
          alt: "Applicazioni del marchio: shopper in cotone, stand fieristico, biglietto da visita, borse e post social",
        },
      ],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Goliosi",
      kind: "Brand identity",
      made: "Logo, website, applications",
      tools: "Illustrator, Figma, Photoshop",
      intro:
        "Brand identity for Goliosi, the Italian extra virgin olive oil portal. The logo brings together Italy’s olive oil culture and the experiences the portal offers. The payoff: “Just for EVO lovers.”",
      coverAlt:
        "The Goliosi logo on a lime green background, with the website and a hiker in the background",
      images: [
        {
          title: "Logo and website",
          alt: "The Goliosi logo on a lime green background, with the website and a hiker in the background",
        },
        {
          title: "The logo concept",
          caption: "Experience and oil in a single shape.",
          alt: "The Goliosi logo, a green spiral, between two hands reaching toward each other and bowls of olives and oil",
        },
        {
          title: "Applications",
          caption: "Tote bags, bags, trade-fair stand, business card and social.",
          alt: "Brand applications: cotton tote bag, trade-fair stand, business card, bags and social posts",
        },
      ],
    },
  },
};
