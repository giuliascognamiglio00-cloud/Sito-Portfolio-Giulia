import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, getDictionary, isLang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { getNextProject, getProject, getProjects } from "@/content/projects";
import Picture, { imageShape } from "@/components/Picture";
import Carousel from "@/components/Carousel";
import Compare from "@/components/Compare";
import ProjectVideo from "@/components/ProjectVideo";
import Stagger from "@/components/Stagger";
import ImageGrid from "@/components/ImageGrid";
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

  // Carosello e galleria si adattano alla forma delle immagini del progetto: orizzontali per
  // le campagne, verticali per i formati social. Senza questo ritaglierebbero tutto a 16:9.
  const shape = imageShape(project.images[0].key);
  // Il video ha una forma sua, che non è per forza quella delle immagini: qui è 16:9 mentre
  // le tavole sono verticali. La ricaviamo dalla sua copertina, ritagliata dal video stesso.
  const videoShape = project.video ? imageShape(project.video.poster) : null;

  // Le sezioni raccontate prima del carosello: immagini e testi si accoppiano per posizione
  const sectionTexts = text.sections;
  const sections = (project.sections ?? []).flatMap((section, i) => {
    const t = sectionTexts?.[i];
    if (!t) return [];
    return [
      {
        layout: section.layout ?? "stagger",
        lead: section.lead ?? false,
        title: t.title,
        items: section.images.map((entry, j) => {
          const { title, caption, alt } = t.items[j];
          const alts = Array.isArray(alt) ? alt : [alt];
          // Coppia mockup e artwork: il primo testo descrive il mockup, il secondo l'opera
          if (typeof entry === "object" && !Array.isArray(entry)) {
            return {
              title,
              caption,
              images: [{ key: entry.mockup, alt: alts[0] }],
              artwork: { key: entry.artwork, alt: alts[1] ?? alts[0] },
            };
          }
          const keys = Array.isArray(entry) ? entry : [entry];
          return {
            title,
            caption,
            images: keys.map((key, k) => ({ key, alt: alts[k] ?? alts[0] })),
          };
        }),
      },
    ];
  });

  const carousel = (
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
            priority={i === 0 && project.carousel !== "end"}
          />
        ),
        caption: text.images[i].title,
      }))}
    />
  );

  const video =
    project.video && text.video ? (
      <ProjectVideo
        src={`/video/${project.video.src}.mp4`}
        poster={`/img/${project.video.poster}-1024.jpg`}
        ratio={videoShape?.ratio ?? "16 / 9"}
        portrait={videoShape?.portrait ?? false}
        title={text.video.title}
        caption={text.video.caption}
        soundOnLabel={dict.project.soundOn}
        soundOffLabel={dict.project.soundOff}
        replayLabel={dict.project.replay}
      />
    ) : null;

  const gallery = (
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
  );

  // Quando il video sta tra le sezioni, accanto al carosello non va più nulla: le immagini
  // sono già nel carosello e ripeterle in griglia sarebbe un doppione
  const inlineVideo = video !== null && project.videoAfter !== undefined;
  const showcase = inlineVideo ? null : (video ?? gallery);

  return (
    <article
      style={
        {
          "--acc": project.accent,
          ...(shape && { "--shot": shape.ratio, "--slide": shape.portrait ? "26rem" : "760px" }),
        } as React.CSSProperties
      }
    >
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

        {project.compare && text.compare ? (
          <Compare
            before={
              <Picture
                name={project.compare.before}
                alt={text.compare.beforeAlt}
                sizes="100vw"
              />
            }
            after={
              <Picture name={project.compare.after} alt={text.compare.afterAlt} sizes="100vw" />
            }
            beforeLabel={dict.project.compareBefore}
            afterLabel={dict.project.compareAfter}
            sliderLabel={dict.project.compareLabel}
            valueTextTemplate={dict.project.compareValue}
            title={text.compare.title}
            caption={text.compare.caption}
          />
        ) : null}

        {sections.map((section, i) => (
          <Fragment key={section.title}>
            <section>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.layout === "grid" ? (
                <ImageGrid
                  label={section.title}
                  items={section.items}
                  lead={section.lead}
                  goToTemplate={dict.project.goToSlide}
                  openArtworkLabel={dict.project.openArtwork}
                  closeArtworkLabel={dict.project.closeArtwork}
                />
              ) : (
                <Stagger
                  label={section.title}
                  headings="h3"
                  items={section.items}
                  goToTemplate={dict.project.goToSlide}
                  openArtworkLabel={dict.project.openArtwork}
                  closeArtworkLabel={dict.project.closeArtwork}
                />
              )}
            </section>
            {inlineVideo && project.videoAfter === i ? (
              <div className={styles.videoAlone}>{video}</div>
            ) : null}
          </Fragment>
        ))}

        {project.gallery === "stagger" ? (
          <Stagger
            label={dict.project.gallery}
            goToTemplate={dict.project.goToSlide}
            openArtworkLabel={dict.project.openArtwork}
            closeArtworkLabel={dict.project.closeArtwork}
            items={project.images.map((image, i) => ({
              images: [{ key: image.key, alt: text.images[i].alt }],
              title: text.images[i].title,
              caption: text.images[i].caption,
            }))}
          />
        ) : project.carousel === "end" ? (
          <>
            {showcase}
            {carousel}
          </>
        ) : (
          <>
            {carousel}
            {showcase}
          </>
        )}

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
