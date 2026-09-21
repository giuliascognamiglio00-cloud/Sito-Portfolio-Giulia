"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, LANG_LABELS, swapLang, type Dictionary, type Lang } from "@/lib/i18n";
import styles from "./LangSwitch.module.css";

/**
 * Cambia lingua restando sulla stessa pagina: sostituisce solo il primo segmento
 * del percorso, così da /it/works/ si arriva a /en/works/.
 */
export default function LangSwitch({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const pathname = usePathname() ?? "/";

  return (
    <div className={styles.group} role="group" aria-label={dict.common.langLabel}>
      {LANGS.map((code) =>
        code === lang ? (
          <span key={code} className={styles.current} aria-current="true">
            {LANG_LABELS[code]}
          </span>
        ) : (
          <Link key={code} href={swapLang(pathname, code)} className={styles.link} hrefLang={code} lang={code}>
            {LANG_LABELS[code]}
          </Link>
        ),
      )}
    </div>
  );
}
