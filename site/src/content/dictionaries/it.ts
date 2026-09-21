export const it = {
  nav: {
    works: "Lavori",
    about: "Chi sono",
    contact: "Contatti",
    home: "Giulia Scognamiglio, home",
    label: "Principale",
  },
  common: {
    skipToContent: "Vai ai contenuti",
    themeToggle: "Cambia tema",
    themeLight: "Passa al tema chiaro",
    themeDark: "Passa al tema scuro",
    langLabel: "Lingua",
    backToWorks: "Tutti i lavori",
    nextProject: "Prossimo progetto",
    downloadCv: "Scarica il CV",
  },
  categories: {
    works: "Lavori",
    academy: "Accademia",
  },
  home: {
    title: "Giulia Scognamiglio | Art Director",
    description:
      "Portfolio di Giulia Scognamiglio, art director: campagne integrate, brand identity e compositing.",
    role: "Art Director",
    lede: "Ideo e realizzo campagne integrate, identità di marca e visual, dal concept alla produzione.",
    selectedWorks: "Lavori scelti",
    seeAll: "Guarda tutti i lavori",
  },
  works: {
    title: "Lavori | Giulia Scognamiglio",
    description:
      "Campagne integrate, brand identity, compositing e content: i progetti di Giulia Scognamiglio.",
    heading: "Lavori",
    lede: "I progetti, dal più recente.",
    academyNote:
      "Sono progetti didattici, nati da brief accademici. I marchi citati appartengono ai rispettivi proprietari.",
    emptyWorks: "I progetti professionali arriveranno presto.",
  },
  project: {
    kind: "Tipo",
    made: "Cosa ho realizzato",
    tools: "Strumenti",
    insight: "Insight",
    concept: "Concept",
    gallery: "Immagini del progetto",
  },
  about: {
    title: "Chi sono | Giulia Scognamiglio",
    description:
      "Art director formata in Graphic Design all'AANT di Roma: campagne integrate, brand identity e compositing.",
    heading: "Chi sono",
  },
  contact: {
    title: "Contatti | Giulia Scognamiglio",
    description: "Scrivimi per collaborazioni, progetti e opportunità di lavoro.",
    heading: "Contatti",
    lede: "Per collaborazioni, progetti o anche solo per fare due chiacchiere.",
  },
  notFound: {
    heading: "Pagina non trovata",
    lede: "La pagina che cercavi non esiste o è stata spostata.",
    cta: "Torna alla home",
  },
};

/** L'italiano è il riferimento: l'inglese deve avere esattamente la stessa forma. */
export type Dictionary = typeof it;
