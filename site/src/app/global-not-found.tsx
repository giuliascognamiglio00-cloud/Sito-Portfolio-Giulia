import "@/styles/globals.css";
import type { Metadata } from "next";
import ThemeScript from "@/components/ThemeScript";
import { fontVariables } from "@/lib/fonts";
import { it } from "@/content/dictionaries/it";
import { en } from "@/content/dictionaries/en";
import { routes } from "@/lib/routes";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = {
  title: "404 | Giulia Scognamiglio",
  robots: { index: false },
};

/**
 * 404 per gli indirizzi che non corrispondono a nessuna rotta. Cloudflare Pages serve
 * out/404.html in questi casi. La lingua dell'indirizzo sbagliato non è nota, quindi la
 * pagina è bilingue: prima l'italiano, poi l'inglese.
 */
export default function GlobalNotFound() {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={fontVariables}>
        <main className={styles.page}>
          <div className={styles.blobs} aria-hidden="true" />
          <p className={styles.code}>404</p>
          <div className={styles.cols}>
            <section lang="it">
              <h1 className={styles.title}>{it.notFound.heading}</h1>
              <p>{it.notFound.lede}</p>
              <a className={styles.cta} href={routes.home("it")}>
                {it.notFound.cta}
              </a>
            </section>
            <section lang="en">
              <h2 className={styles.title}>{en.notFound.heading}</h2>
              <p>{en.notFound.lede}</p>
              <a className={styles.cta} href={routes.home("en")}>
                {en.notFound.cta}
              </a>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
