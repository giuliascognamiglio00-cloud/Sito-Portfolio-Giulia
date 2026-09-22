import { Anton, Big_Shoulders, Google_Sans_Flex, Roboto_Condensed } from "next/font/google";

// I font sono serviti dal nostro dominio: nessuna chiamata a Google al caricamento.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Corpo del testo. Google Sans Flex è un font variabile: "variable" prende l'intero
// intervallo di pesi in un solo file, e l'asse opsz è fissato a 9 in globals.css
// (font-variation-settings) per l'ottico "da testo" — lo stesso di "GoogleSansFlex_9pt-…".
const text = Google_Sans_Flex({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-text",
  display: "swap",
  // Come per Big Shoulders: Next non ha ancora le metriche di questo font, appena arrivato
  // su Google Fonts, per calcolare il fallback automatico
  adjustFontFallback: false,
});

// Big Shoulders è il nome attuale su Google Fonts di quello che prima era "Big Shoulders Display".
// Solo per il nome nell'apertura della home.
const name = Big_Shoulders({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-name",
  display: "swap",
  // Next non ha le metriche di questo font per calcolare il fallback: senza, avvisa a ogni build
  adjustFontFallback: false,
});

// Solo per il ruolo nell'apertura della home.
const role = Roboto_Condensed({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-role",
  display: "swap",
});

/** Classi da mettere sul <body>: definiscono le variabili CSS dei quattro font. */
export const fontVariables = [display, text, name, role].map((f) => f.variable).join(" ");
