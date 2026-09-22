import Link from "next/link";
import { contacts, routes } from "@/lib/routes";
import type { Dictionary, Lang } from "@/lib/i18n";
import styles from "./Footer.module.css";

/** Footer nel tema del sito: stessi gradienti dell'hero e dei Contatti, testo dal dizionario. */
export default function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const links = [
    { href: routes.works(lang), label: dict.nav.works },
    { href: routes.about(lang), label: dict.nav.about },
    { href: routes.contact(lang), label: dict.nav.contact },
  ];

  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.name}>Giulia Scognamiglio</p>
          <p className={styles.role}>{dict.home.role}</p>
        </div>

        <nav aria-label={dict.footer.navLabel} className={styles.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contact}>
          <a className={styles.mail} href={`mailto:${contacts.email}`}>
            {contacts.email}
          </a>
          <div className={styles.social}>
            <a href={contacts.behance} target="_blank" rel="noopener">
              Behance
            </a>
            <a href={contacts.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href="/cv/Giulia_Scognamiglio_CV_EN.pdf" download>
              {dict.common.downloadCv}
            </a>
          </div>
        </div>
      </div>

      <p className={`wrap ${styles.copy}`}>© {year} Giulia Scognamiglio</p>
    </footer>
  );
}
