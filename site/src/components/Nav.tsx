import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Dictionary, Lang } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.css";

export default function Nav({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const links = [
    { href: routes.works(lang), label: dict.nav.works },
    { href: routes.about(lang), label: dict.nav.about },
    { href: routes.contact(lang), label: dict.nav.contact },
  ];

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.brand} href={routes.home(lang)} aria-label={dict.nav.home}>
          <span className={styles.full}>Giulia Scognamiglio</span>
          <span className={styles.mono} aria-hidden="true">
            GS
          </span>
        </Link>

        <nav aria-label={dict.nav.label} className={styles.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.tools}>
          <LangSwitch lang={lang} dict={dict} />
          <ThemeToggle dict={dict} />
        </div>
      </div>
    </header>
  );
}
