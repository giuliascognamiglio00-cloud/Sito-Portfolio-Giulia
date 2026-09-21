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

  return (
    <div className="wrap">
      <section className={styles.contact}>
        <h1 className="display">{dict.contact.heading}</h1>
        <p className={styles.lede}>{dict.contact.lede}</p>

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
