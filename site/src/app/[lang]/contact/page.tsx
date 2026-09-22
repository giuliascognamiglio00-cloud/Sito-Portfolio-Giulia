import type { Metadata } from "next";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { contacts } from "@/lib/routes";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.contact.heading,
    description: dict.contact.description,
    alternates: {
      canonical: `/${lang}/contact/`,
      languages: { it: "/it/contact/", en: "/en/contact/" },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const typed = (isLang(lang) ? lang : "it") as Lang;
  const dict = getDictionary(typed);
  const { meet, closing } = dict.contact;

  return (
    <div className="wrap">
      <header className={styles.head}>
        <h1 className="display">{dict.contact.heading}</h1>
        <p className={styles.lede}>{dict.contact.lede}</p>
      </header>

      {/* 01 — Meet me: nessun video per ora, il riquadro è un segnaposto */}
      <section className={styles.meet} aria-labelledby="meet-title">
        <p className={styles.eyebrow}>{meet.eyebrow}</p>
        <h2 id="meet-title" className={styles.meetTitle}>
          {meet.title}
        </h2>
        <p className={styles.meetLede}>{meet.lede}</p>

        <div className={styles.meetGrid}>
          <div className={styles.stage} role="img" aria-label={meet.soon}>
            <span className={styles.play} aria-hidden="true">
              ▶
            </span>
            <span className={styles.soon}>{meet.soon}</span>
          </div>

          <div>
            <h3 className={styles.chaptersLabel}>{meet.chaptersLabel}</h3>
            <ol className={styles.chapters}>
              {meet.chapters.map((chapter, i) => (
                <li key={chapter.title}>
                  <span className={styles.chapterNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{chapter.title}</strong>
                    <p>{chapter.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 02 — Epigrafe di chiusura con l'unica azione richiesta */}
      <section className={styles.contact} aria-labelledby="closing-title">
        <p className={styles.eyebrow}>{closing.eyebrow}</p>
        <h2 id="closing-title" className="display">
          {closing.title}
        </h2>
        <p className={styles.lede}>{closing.text}</p>

        <a className={styles.cta} href={`mailto:${contacts.email}`}>
          {closing.cta} <span aria-hidden="true">→</span>
        </a>

        <a className={styles.mail} href={`mailto:${contacts.email}`}>
          {contacts.email}
        </a>

        <div className={styles.links}>
          <a href={contacts.behance} target="_blank" rel="noopener">
            Behance
          </a>
          <a href={contacts.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
