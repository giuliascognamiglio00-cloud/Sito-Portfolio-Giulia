/**
 * Applica il tema salvato prima che la pagina venga disegnata.
 * Senza questo si vedrebbe un lampo di tema chiaro prima che React si avvii.
 * Deve restare uno script inline nel <head>: qualsiasi cosa asincrona arriverebbe tardi.
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
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
