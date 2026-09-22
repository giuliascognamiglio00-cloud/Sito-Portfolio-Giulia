import type { Metadata } from "next";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { profile } from "@/content/profile";
import Portrait from "@/components/Portrait";
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
    title: dict.about.heading,
    description: dict.about.description,
    alternates: { canonical: `/${lang}/about/`, languages: { it: "/it/about/", en: "/en/about/" } },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const typed = (isLang(lang) ? lang : "it") as Lang;
  const dict = getDictionary(typed);
  const text = profile[typed];

  return (
    <div className="wrap">
      <section className={styles.section}>
        <div className={styles.about}>
          <Portrait
            className={styles.portrait}
            alt={text.portraitAlt}
            sizes="(max-width: 820px) 300px, 340px"
            priority
          />
          <div>
            <h1 className="display">{dict.about.heading}</h1>
            <p className={styles.bio}>{text.bio}</p>
            <a className={styles.cv} href="/cv/Giulia_Scognamiglio_CV_EN.pdf" download>
              {dict.common.downloadCv}
            </a>
            <dl className={styles.facts}>
              {text.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  {fact.lines.map((line) => (
                    <dd key={line}>{line}</dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
