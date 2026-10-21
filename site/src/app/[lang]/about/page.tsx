import type { Metadata } from "next";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import {
  profile,
  photos,
  photoAlts,
  polaroids,
  polaroidAlts,
} from "@/content/profile";
import Portrait from "@/components/Portrait";
import DownloadCv from "@/components/DownloadCv";
import PhotoCamera from "@/components/PhotoCamera";
import FloatingObjects from "@/components/FloatingObjects";
import InstantCamera from "@/components/InstantCamera";
import { largestSrc } from "@/components/Picture";
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
    alternates: {
      canonical: `/${lang}/about/`,
      languages: { it: "/it/about/", en: "/en/about/" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const typed = (isLang(lang) ? lang : "it") as Lang;
  const dict = getDictionary(typed);
  const text = profile[typed];

  return (
    <>
      {/* Sopra a "Chi sono": gli oggetti 3D che fluttuano, per ora la fotocamera in miniatura */}
      <FloatingObjects />
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
              <DownloadCv
                href="/cv/Giulia_Scognamiglio_CV_EN.pdf"
                label={dict.common.downloadCv}
                doneLabel={dict.common.downloadedCv}
              />
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

        {/* Gli interessi, con la fotocamera 3D: sul display le foto di Giulia */}
        <section className={styles.interests} aria-labelledby="interests">
          <div>
            <h2 id="interests" className="display display-slim">
              {text.interests.title}
            </h2>
            <p className={styles.interestsText}>{text.interests.text}</p>
            <ul className={styles.tags}>
              {text.interests.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <PhotoCamera
            photos={photos.map((name, i) => ({
              src: largestSrc(name),
              alt: photoAlts[typed][i] ?? "",
            }))}
            labels={dict.camera}
          />
        </section>

        {/* L'anno all'estero: a sinistra la fotocamera istantanea 3D, che scatta e stampa le
            polaroid; a destra il racconto */}
        <section className={styles.abroad} aria-labelledby="abroad">
          <InstantCamera
            photos={polaroids.map((name, i) => ({
              src: largestSrc(name),
              alt: polaroidAlts[typed][i] ?? "",
            }))}
            labels={dict.instant}
          />
          <div>
            <h2 id="abroad" className="display display-slim">
              {text.abroad.title}
            </h2>
            {text.abroad.text.map((paragraph) => (
              <p key={paragraph} className={styles.interestsText}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
