import type { Dictionary } from "./it";

export const en: Dictionary = {
  nav: {
    works: "Work",
    about: "About",
    contact: "Contact",
    home: "Giulia Scognamiglio, home",
    label: "Main",
  },
  common: {
    skipToContent: "Skip to content",
    themeToggle: "Switch theme",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    langLabel: "Language",
    backToWorks: "All work",
    nextProject: "Next project",
    downloadCv: "Download CV",
  },
  footer: {
    navLabel: "Footer",
  },
  categories: {
    works: "Work",
    academy: "Academic",
  },
  areas: {
    branding: "Branding",
    "art-direction": "Art direction",
    campaign: "Integrated campaigns",
    social: "Social media",
    "ui-ux": "UI/UX",
    photo: "Photography",
    compositing: "Compositing",
  },
  home: {
    title: "Giulia Scognamiglio | Art Director",
    description:
      "Portfolio of Giulia Scognamiglio, art director: integrated campaigns, brand identity and compositing.",
    role: "Art Director",
    lede: "I craft integrated campaigns, brand identities and visuals, from concept to production.",
    selectedWorks: "Selected work",
    seeAll: "See all work",
  },
  works: {
    title: "Work | Giulia Scognamiglio",
    description:
      "Integrated campaigns, brand identity, compositing and content: projects by Giulia Scognamiglio.",
    heading: "Work",
    lede: "Projects, most recent first.",
    academyNote:
      "These are academic projects, built from university briefs. All trademarks belong to their respective owners.",
    emptyWorks: "Professional projects are coming soon.",
    timelineLabel: "Filter by year",
    allYears: "All",
    emptyYear: "No project for this year, in this section.",
  },
  project: {
    kind: "Type",
    made: "What I made",
    tools: "Tools",
    insight: "Insight",
    concept: "Concept",
    gallery: "Project images",
    areasLabel: "Areas",
    carousel: "Browse the project",
    drag: "Drag to explore",
    prevSlide: "Previous image",
    nextSlide: "Next image",
  },
  about: {
    title: "About | Giulia Scognamiglio",
    description:
      "Art director trained in Graphic Design at AANT in Rome: integrated campaigns, brand identity and compositing.",
    heading: "About",
  },
  contact: {
    title: "Contact | Giulia Scognamiglio",
    description: "Get in touch about collaborations, projects and opportunities.",
    heading: "Contact",
    lede: "For collaborations, projects, or just to say hello.",
    // DRAFT to be reviewed by Giulia.
    meet: {
      eyebrow: "01 — Meet me",
      title: "Before you write, let’s get acquainted.",
      lede: "One minute to put a face to the projects.",
      soon: "Video coming soon",
      chaptersLabel: "What I talk about",
      chapters: [
        { title: "Who I am", text: "Art director trained in Graphic Design at AANT in Rome." },
        {
          title: "What I do",
          text: "Integrated campaigns, brand identity, compositing, art direction and social content.",
        },
        {
          title: "What I work with",
          text: "Photoshop, Illustrator, InDesign, Premiere, After Effects, Figma and more.",
        },
        {
          title: "Where I’m from",
          text: "Rome, and a year of school in California that gave me solid English.",
        },
      ],
    },
    closing: {
      eyebrow: "02 — One action from here",
      title: "Let’s talk about your next project.",
      text: "No perfect brief and no strings attached: send me a couple of lines about what you have in mind and I’ll reply myself.",
      cta: "Get in touch",
    },
  },
  notFound: {
    heading: "Page not found",
    lede: "The page you were looking for does not exist or has moved.",
    cta: "Back to home",
  },
};
