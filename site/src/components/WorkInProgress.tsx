import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import styles from "./WorkInProgress.module.css";

/**
 * La pagina "Work in progress", al posto del contenuto delle pagine elencate in lib/wip.ts.
 * Non sa niente della pagina che sostituisce: chi la usa decide solo quando mostrarla.
 */
export default function WorkInProgress({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.wip;
  return (
    <section className={`${styles.page} under-nav`}>
      <div className={styles.blobs} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.emoji}>🐌</span>
        </div>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1 className={`display ${styles.title}`}>{t.heading}</h1>
        <p className={styles.lede}>{t.lede}</p>
        <Link className={styles.cta} href={routes.home(lang)}>
          {t.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
