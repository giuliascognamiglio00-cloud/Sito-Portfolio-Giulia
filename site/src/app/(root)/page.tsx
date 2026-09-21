/*
  In questa pagina le ancore HTML sono volute: l'unico contenuto visibile sta dentro
  <noscript> ed esiste proprio per chi non ha JavaScript, dove <Link> di next/link
  non porterebbe alcun vantaggio.
*/
/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { DEFAULT_LANG, LANGS } from "@/lib/i18n";

export const metadata: Metadata = {
  // Questa pagina non deve finire nei risultati di ricerca: le pagine vere sono /it/ e /en/
  robots: { index: false, follow: false },
  title: "Giulia Scognamiglio",
};

/**
 * In un sito statico non c'è un server che possa leggere l'header Accept-Language,
 * quindi la scelta della lingua avviene nel browser, prima di disegnare qualsiasi cosa.
 * In produzione Cloudflare intercetta "/" con public/_redirects e questa pagina non
 * viene quasi mai raggiunta: resta come rete di sicurezza e per lo sviluppo locale.
 */
const redirectScript = `
(function () {
  var supported = ${JSON.stringify(LANGS)};
  var fallback = ${JSON.stringify(DEFAULT_LANG)};
  var wanted = fallback;
  try {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    for (var i = 0; i < languages.length; i++) {
      var code = String(languages[i] || "").slice(0, 2).toLowerCase();
      if (supported.indexOf(code) !== -1) { wanted = code; break; }
    }
  } catch (e) {}
  location.replace("/" + wanted + "/");
})();
`;

export default function RootRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <p style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
          <a href={`/${DEFAULT_LANG}/`}>Vai al sito</a> — <a href="/en/">Go to the site</a>
        </p>
      </noscript>
    </>
  );
}
