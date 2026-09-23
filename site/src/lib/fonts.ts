import { Anton, Big_Shoulders, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";

// I font sono serviti dal nostro dominio: nessuna chiamata a Google al caricamento.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Corpo del testo. Il file è ricavato una volta sola da `font/GoogleSansFlex-VariableFont…ttf`
// (vedi README): ottico fissato a 9, quello "da testo", solo il peso lasciato variabile e
// caratteri ridotti al latino. Da un file nostro Next ricava le metriche e genera il ripiego
// calibrato, cosa che con next/font/google non riusciva a fare: il testo non sobbalza più.
const text = localFont({
  src: "../fonts/GoogleSansFlex-9pt-latin.woff2",
  weight: "1 1000",
  variable: "--font-text",
  display: "swap",
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
