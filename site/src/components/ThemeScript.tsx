"use client";

/**
 * Applica il tema salvato prima che la pagina venga disegnata.
 * Senza questo si vedrebbe un lampo di tema chiaro prima che React si avvii.
 * Deve restare uno script inline nel <head>: qualsiasi cosa asincrona arriverebbe tardi
 * (anche next/script con beforeInteractive, che lo mette in coda dietro al JavaScript di Next).
 */
const script = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  // Lo script serve solo nell'HTML che arriva dal server, dove viene eseguito subito. Nel
  // browser il componente non disegna niente: React 19 salta il tag già presente nel <head>,
  // e non mostra l'avviso «Encountered a script tag while rendering React component»
  if (typeof window !== "undefined") return null;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
