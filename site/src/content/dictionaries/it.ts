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
    downloadedCv: "Scaricato",
  },
  footer: {
    navLabel: "Piè di pagina",
  },
  categories: {
    works: "Lavori",
    academy: "Accademia",
  },
  areas: {
    branding: "Branding",
    "art-direction": "Art direction",
    campaign: "Campagne integrate",
    social: "Social media",
    "ui-ux": "UI/UX",
    photo: "Fotografia",
    compositing: "Compositing",
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
    timelineLabel: "Filtra per anno",
    allYears: "Tutti",
    emptyYear: "Nessun progetto per questo anno, in questa sezione.",
  },
  project: {
    kind: "Tipo",
    made: "Cosa ho realizzato",
    tools: "Strumenti",
    insight: "Insight",
    concept: "Concept",
    gallery: "Immagini del progetto",
    areasLabel: "Macroaree",
    carousel: "Sfoglia il progetto",
    drag: "Trascina per esplorare",
    prevSlide: "Immagine precedente",
    nextSlide: "Immagine successiva",
    compareBefore: "Prima",
    compareAfter: "Dopo",
    compareLabel: "Confronto prima e dopo",
    // {value} viene sostituito con la posizione del divisore
    compareValue: "Divisore al {value}%",
    soundOn: "Attiva l’audio",
    soundOff: "Disattiva l’audio",
    replay: "Riparti dall’inizio",
    // {n} viene sostituito con il numero dell'immagine
    goToSlide: "Vai all’immagine {n}",
    openArtwork: "Guarda il manifesto intero",
    closeArtwork: "Chiudi",
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
    // Bozza da rivedere con Giulia. Nessun capitolo nomina il datore di lavoro.
    meet: {
      eyebrow: "01 — Ti presento chi sono",
      title: "Prima di scrivermi, conosciamoci.",
      lede: "Un minuto per dare un volto ai progetti.",
      soon: "Video in arrivo",
      chaptersLabel: "Di cosa parlo",
      chapters: [
        { title: "Chi sono", text: "Art director formata in Graphic Design all’AANT di Roma." },
        {
          title: "Cosa faccio",
          text: "Campagne integrate, brand identity, compositing, art direction e contenuti per i social.",
        },
        {
          title: "Con cosa lavoro",
          text: "Photoshop, Illustrator, InDesign, Premiere, After Effects, Figma e altri strumenti.",
        },
        {
          title: "Da dove vengo",
          text: "Roma, e un anno di scuola in California che mi ha dato un buon inglese.",
        },
      ],
    },
    closing: {
      eyebrow: "02 — Un’azione da qui",
      title: "Parliamo del tuo prossimo progetto.",
      text: "Nessun brief perfetto e nessun impegno: scrivimi due righe su cosa hai in mente e ti rispondo io.",
      cta: "Mettiamoci in contatto",
    },
  },
  notFound: {
    heading: "Pagina non trovata",
    lede: "La pagina che cercavi non esiste o è stata spostata.",
    cta: "Torna alla home",
  },
};

/** L'italiano è il riferimento: l'inglese deve avere esattamente la stessa forma. */
export type Dictionary = typeof it;
