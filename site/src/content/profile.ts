import type { Lang } from "@/lib/i18n";

type ProfileText = {
  bio: string;
  facts: { label: string; lines: string[] }[];
  portraitAlt: string;
};

// Testi italiani ripresi dalla bozza. Nell'esperienza c'è solo OMEN srl, su richiesta di
// Giulia (tolti freelance e Idesiervo); ruolo e anni sono da precisare.
// Traduzione inglese: BOZZA da rileggere da Giulia.
export const profile: Record<Lang, ProfileText> = {
  it: {
    bio: "Sono art director. Mi sono formata in Graphic Design all’AANT, l’Accademia di Arte e Nuove Tecnologie di Roma, e lavoro su campagne integrate, brand identity e compositing, dall’idea alla realizzazione. Un anno di scuola in California mi ha dato un buon inglese. Lavoro bene in gruppo, anche sotto scadenza, e cerco progetti nuovi che mi mettano alla prova.",
    portraitAlt: "Ritratto di Giulia Scognamiglio",
    facts: [
      {
        label: "Esperienza",
        lines: [
          "OMEN srl, ruolo attuale",
        ],
      },
      {
        label: "Formazione",
        lines: [
          "Graphic Design, AANT Roma, dal 2020",
          "Diploma in Grafica Pubblicitaria, Istituto Carlo Urbani, 2020",
        ],
      },
      {
        label: "Strumenti",
        lines: [
          "Illustrator, Photoshop, After Effects, Lightroom, InDesign, Premiere, Dreamweaver, Cinema 4D, Figma",
        ],
      },
      {
        label: "Lingue e interessi",
        lines: [
          "Inglese B2/C1, dopo un anno di scuola in California (2018–2019)",
          "Animali, viaggi e discipline aeree",
        ],
      },
    ],
  },
  en: {
    bio: "I’m an art director. I trained in Graphic Design at AANT, the Academy of Art and New Technologies in Rome, and I work on integrated campaigns, brand identity and compositing, from idea to execution. A year of school in California gave me solid English. I work well in a team, even under deadline, and I’m looking for new projects that challenge me.",
    portraitAlt: "Portrait of Giulia Scognamiglio",
    facts: [
      {
        label: "Experience",
        lines: [
          "OMEN srl, current role",
        ],
      },
      {
        label: "Education",
        lines: [
          "Graphic Design, AANT Rome, since 2020",
          "Diploma in Advertising Graphics, Istituto Carlo Urbani, 2020",
        ],
      },
      {
        label: "Tools",
        lines: [
          "Illustrator, Photoshop, After Effects, Lightroom, InDesign, Premiere, Dreamweaver, Cinema 4D, Figma",
        ],
      },
      {
        label: "Languages and interests",
        lines: [
          "English B2/C1, after a year of school in California (2018–2019)",
          "Animals, travel and aerial disciplines",
        ],
      },
    ],
  },
};
