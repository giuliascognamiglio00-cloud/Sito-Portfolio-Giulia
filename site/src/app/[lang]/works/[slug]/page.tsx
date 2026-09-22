import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, getDictionary, isLang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { getNextProject, getProject, getProjects } from "@/content/projects";
import Picture from "@/components/Picture";
import Carousel from "@/components/Carousel";
import styles from "./page.module.css";

type Params = { lang: string; slug: string };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => getProjects().map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLang(lang) || !project) return {};
  const text = project.content[lang];
  return {
    title: text.title,
    description: text.intro,
    alternates: {
      canonical: routes.project(lang, slug),
      languages: { it: routes.project("it", slug), en: routes.project("en", slug) },
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLang(lang) || !project) notFound();

  const dict = getDictionary(lang);
  const text = project.content[lang];
  const next = getNextProject(slug);
  const nextText = next.content[lang];

  return (
    <article style={{ "--acc": project.accent } as React.CSSProperties}>
      <header className={styles.head}>
        {/* Sfondo fotografico a piena pagina: titolo, macroaree e la griglia Tipo/Cosa ho
            realizzato/Strumenti stanno sopra, non è più un riquadro contenuto come prima */}
        <Picture
          name={project.introImage}
          alt=""
          sizes="100vw"
          priority
          className={styles.headImg}
        />
        <div className={`wrap ${styles.headInner}`}>
          <Link href={routes.works(lang)} className={styles.back}>
            <span aria-hidden="true">←</span> {dict.common.backToWorks}
          </Link>
          <h1 className={styles.title}>{text.title}</h1>

          <div className={styles.metaBlock}>
            <ul className={styles.areas} aria-label={dict.project.areasLabel}>
              {project.areas.map((area) => (
                <li key={area}>{dict.areas[area]}</li>
              ))}
            </ul>
            <dl className={styles.meta}>
              <div>
                <dt>{dict.project.kind}</dt>
                <dd>{text.kind}</dd>
              </div>
              <div>
                <dt>{dict.project.made}</dt>
                <dd>{text.made}</dd>
              </div>
              <div>
                <dt>{dict.project.tools}</dt>
                <dd>{text.tools}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="wrap">
        <p className={styles.intro}>{text.intro}</p>

        {text.concept ? (
          <div className={styles.idea}>
            <div>
              <h2>{dict.project.insight}</h2>
              <p>{text.insight}</p>
            </div>
            <div className={styles.concept}>
              <h2>{dict.project.concept}</h2>
              <p>{text.concept}</p>
            </div>
          </div>
        ) : null}

        {/* Provvisorio: il carosello convive con la galleria. Per toglierlo basta rimuovere questo blocco. */}
        <Carousel
          label={dict.project.carousel}
          hint={dict.project.drag}
          prevLabel={dict.project.prevSlide}
          nextLabel={dict.project.nextSlide}
          slides={project.images.map((image, i) => ({
            node: (
              <Picture
                name={image.key}
                alt={text.images[i].alt}
                sizes="(max-width: 860px) 88vw, 760px"
                priority={i === 0}
              />
            ),
            caption: text.images[i].title,
          }))}
        />

        <ul className={styles.gallery} aria-label={dict.project.gallery}>
          {project.images.map((image, i) => {
            const t = text.images[i];
            return (
              <li key={image.key} className={image.half ? undefined : styles.full}>
                <figure>
                  <Picture
                    name={image.key}
                    alt={t.alt}
                    sizes={image.half ? "(max-width: 700px) 100vw, 50vw" : "100vw"}
                    className={styles.img}
                  />
                  {t.title || t.caption ? (
                    <figcaption>
                      {t.title ? <strong>{t.title}</strong> : null}
                      {t.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            );
          })}
        </ul>

        <Link
          href={routes.project(lang, next.slug)}
          className={styles.next}
          style={{ "--acc": next.accent } as React.CSSProperties}
        >
          <div>
            <small>{dict.common.nextProject}</small>
            <span className={styles.nextTitle}>{nextText.title}</span>
          </div>
          <Picture name={next.cover} alt="" sizes="(max-width: 800px) 100vw, 40vw" />
        </Link>
      </div>
    </article>
  );
}
