import { Anton, Big_Shoulders, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";

// I font sono serviti dal nostro dominio: nessuna chiamata a Google al caricamento.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Corpo del testo: Google Sans. Il file è ricavato una volta sola da
// `font/Google_Sans/GoogleSans-VariableFont…ttf` (vedi README): ottico fissato a 17, quello
// "da testo", solo il peso lasciato variabile (400–700) e caratteri ridotti al latino. Da un
// file nostro Next ricava le metriche e genera il ripiego calibrato: il testo non sobbalza.
const text = localFont({
  src: "../fonts/GoogleSans-latin.woff2",
  weight: "400 700",
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

/**
 * Classi da mettere su <html>, non su <body>: definiscono le variabili dei quattro font, e
 * tokens.css le legge su :root (cioè <html>) per comporre --text e --display. Messe sul body,
 * a quel livello non esistevano ancora e tutto il sito ricadeva sul Times.
 */
export const fontVariables = [display, text, name, role].map((f) => f.variable).join(" ");
