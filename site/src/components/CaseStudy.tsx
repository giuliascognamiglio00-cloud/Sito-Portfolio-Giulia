import { Fragment } from "react";
import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import type { CaseTile, CaseTileText, Project, ProjectText } from "@/content/types";
import Picture, { imageShape } from "./Picture";
import ToolIcon from "./ToolIcon";
import Mosaic, { type MosaicItem } from "./Mosaic";
import PhoneStories from "./PhoneStories";
import ProjectVideo from "./ProjectVideo";
import Compare from "./Compare";
import Carousel from "./Carousel";
import BoardSlides from "./BoardSlides";
import OutputSwitch from "./OutputSwitch";
import Tentacles from "./Tentacles";
import Floaters from "./Floaters";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project;
  text: ProjectText;
  dict: Dictionary;
  lang: Lang;
};

/** Riquadro grigio con le diagonali, come nel wireframe: si vede subito che va sostituito */
function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`${styles.placeholder} ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
      </svg>
      <span>[{label}]</span>
    </div>
  );
}

/**
 * Le voci del mosaico, preparate qui sul server: il riquadro ritagliato e l'immagine intera
 * per l'anteprima, che il componente client mostra al clic.
 */
function mosaicItems(tiles: CaseTile[], texts: CaseTileText[], placeholder: string): MosaicItem[] {
  return tiles.map((tile, i) => {
    const t = texts[i];
    const alt = t?.alt ?? "";
    return {
      label: t?.label ?? "",
      cols: tile.cols ?? 1,
      rows: tile.rows ?? 1,
      node: tile.key ? (
        <Picture
          name={tile.key}
          alt={alt}
          sizes={
            tile.cols === 2 ? "(max-width: 640px) 100vw, 60vw" : "(max-width: 640px) 100vw, 30vw"
          }
        />
      ) : (
        <Placeholder label={placeholder} />
      ),
      // Di un mockup l'anteprima mostra l'opera piatta, che in pagina non si vede
      full: tile.artwork ? (
        <Picture name={tile.artwork} alt={t?.artworkAlt ?? alt} sizes="90vw" />
      ) : tile.key ? (
        <Picture name={tile.key} alt={alt} sizes="90vw" />
      ) : undefined,
    };
  });
}

/**
 * Pagina progetto con l'impostazione del wireframe definitivo: intestazione su foto,
 * Brief/Concept/Tools, moodboard, backstage, confronto prima/dopo, identità visiva, video e
 * wireframe (se ci sono), output (in un mosaico unico, divisi in gruppi o uno alla volta) e
 * immagine di chiusura. Ogni riquadro dei mosaici apre l'anteprima al clic. Si attiva con `layout: "case"` nel file del progetto.
 */
export default function CaseStudy({ project, text, dict, lang }: Props) {
  const content = project.case ?? { output: [] };
  const caseText = text.case ?? { output: [] };
  const tools = text.tools.split(",").map((tool) => tool.trim()).filter(Boolean);
  const mosaics = [
    { title: dict.project.identity, tiles: content.identity, texts: caseText.identity },
    { title: dict.project.wireframes, tiles: content.wireframes, texts: caseText.wireframes },
    { title: dict.project.output, tiles: content.output, texts: caseText.output },
  ];

  const videoShape = project.video ? imageShape(project.video.poster) : null;
  const video =
    project.video && text.video ? (
      <section className={`${styles.block} ${styles.video}`}>
        <h2 className={styles.blockTitle}>{text.video.title}</h2>
        <ProjectVideo
          src={`/video/${project.video.src}.mp4`}
          poster={`/img/${project.video.poster}-1024.jpg`}
          ratio={videoShape?.ratio ?? "16 / 9"}
          portrait={videoShape?.portrait ?? false}
          caption={text.video.caption}
          soundOnLabel={dict.project.soundOn}
          soundOffLabel={dict.project.soundOff}
          replayLabel={dict.project.replay}
        />
      </section>
    ) : null;

  // Gli adesivi attaccati all'angolo di una sezione: solo decorazione
  const stickersAt = (at: NonNullable<typeof content.stickers>[number]["at"]) =>
    content.stickers
      ?.filter((sticker) => sticker.at === at)
      .map((sticker) => (
        <span
          key={sticker.key}
          className={`${styles.sticker} ${styles[`sticker_${at}`]}`}
          aria-hidden="true"
        >
          <Picture name={sticker.key} alt="" sizes="180px" />
        </span>
      ));

  return (
    <article
      className={styles.article}
      style={{ "--acc": project.accent } as React.CSSProperties}
    >
      {content.floaters?.length ? <Floaters keys={content.floaters} /> : null}
      <header className={`${styles.head} under-nav`}>
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
          <h1
            className={styles.title}
            style={project.titleColor ? { color: project.titleColor } : undefined}
          >
            {text.title}
          </h1>
          {text.subtitle ? <p className={styles.subtitle}>{text.subtitle}</p> : null}
          <ul className={styles.areas} aria-label={dict.project.areasLabel}>
            {project.areas.map((area) => (
              <li key={area}>{dict.areas[area]}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="wrap">
        <div className={styles.brief}>
          {stickersAt("brief")}
          {content.tentacles?.length ? <Tentacles items={content.tentacles} /> : null}
          <section>
            <h2>{dict.project.brief}</h2>
            <p>{text.intro}</p>
          </section>
          {text.concept ? (
            <section>
              <h2>{dict.project.concept}</h2>
              <p>{text.concept}</p>
              {/* L'insight, dove c'è, sta sotto al concept da cui nasce */}
              {text.insight ? <p className={styles.insight}>{text.insight}</p> : null}
            </section>
          ) : null}
          <section>
            <h2>{dict.project.tools}</h2>
            <ul className={styles.tools}>
              {tools.map((tool) => (
                <li key={tool}>
                  <ToolIcon name={tool} className={styles.toolIcon} />
                  {tool}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>{dict.project.moodboard}</h2>
          {stickersAt("moodboard")}
          {content.moodboard && content.moodboardMore?.length ? (
            <BoardSlides
              label={dict.project.moodboard}
              slides={[content.moodboard, ...content.moodboardMore].map((key, i) => ({
                label: i === 0 ? dict.project.moodboard : (caseText.moodboardMore?.[i - 1]?.label ?? ""),
                node: (
                  <Picture
                    name={key}
                    alt={
                      i === 0
                        ? (caseText.moodboardAlt ?? "")
                        : (caseText.moodboardMore?.[i - 1]?.alt ?? "")
                    }
                    sizes="100vw"
                  />
                ),
              }))}
            />
          ) : content.moodboard ? (
            <Picture
              name={content.moodboard}
              alt={caseText.moodboardAlt ?? ""}
              sizes="100vw"
              className={`${styles.wide} ${styles.moodboard}`}
            />
          ) : (
            <Placeholder label={dict.project.placeholder} className={styles.moodboard} />
          )}
        </section>

        {/* Il backstage, dove c'è: una galleria da scorrere in orizzontale */}
        {content.backstage?.length && caseText.backstage ? (
          <section
            className={styles.block}
            style={{ "--shot": "1 / 1", "--slide": "20rem" } as React.CSSProperties}
          >
            <h2 className={styles.blockTitle}>{caseText.backstage.title}</h2>
            {caseText.backstage.text ? (
              <p className={styles.blockText}>{caseText.backstage.text}</p>
            ) : null}
            <Carousel
              label={caseText.backstage.title}
              hint={dict.project.drag}
              prevLabel={dict.project.prevSlide}
              nextLabel={dict.project.nextSlide}
              slides={content.backstage.map((key, i) => ({
                node: (
                  <Picture
                    name={key}
                    alt={caseText.backstage?.items[i]?.alt ?? ""}
                    sizes="(max-width: 640px) 88vw, 320px"
                  />
                ),
                caption: caseText.backstage?.items[i]?.caption,
              }))}
            />
          </section>
        ) : null}

        {/* Il confronto prima/dopo, dove c'è: a tutta larghezza, e subito sotto gli output */}
        {project.compare && text.compare ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>{text.compare.title}</h2>
            <Compare
              before={
                <Picture name={project.compare.before} alt={text.compare.beforeAlt} sizes="100vw" />
              }
              after={
                <Picture name={project.compare.after} alt={text.compare.afterAlt} sizes="100vw" />
              }
              beforeLabel={dict.project.compareBefore}
              afterLabel={dict.project.compareAfter}
              sliderLabel={dict.project.compareLabel}
              valueTextTemplate={dict.project.compareValue}
              caption={text.compare.caption}
            />
          </section>
        ) : null}

        {/* Identità visiva e wireframe sono facoltativi; gli output ci sono sempre. Il
            video, dove c'è, sta subito dopo l'identità visiva, prima di wireframe e output */}
        {mosaics.map((m, i) => (
          <Fragment key={m.title}>
            {i === 1 ? video : null}
            {m.tiles?.length ? (
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>{m.title}</h2>
                {m.title === dict.project.output ? stickersAt("output") : null}
                {m.title === dict.project.output && content.outputLayout === "switch" ? (
                  <OutputSwitch
                    label={dict.project.chooseOutput}
                    showTemplate={dict.project.showOutput}
                    items={m.tiles.map((tile, t) => ({
                      label: m.texts?.[t]?.label ?? "",
                      main: tile.key ? (
                        <Picture
                          name={tile.key}
                          alt={m.texts?.[t]?.alt ?? ""}
                          sizes="(max-width: 640px) 100vw, 75vw"
                        />
                      ) : null,
                      thumb: tile.key ? (
                        <Picture name={tile.key} alt="" sizes="(max-width: 640px) 50vw, 25vw" />
                      ) : null,
                    }))}
                  />
                ) : (
                  <Mosaic
                    items={mosaicItems(m.tiles, m.texts ?? [], dict.project.placeholder)}
                    openLabel={dict.project.openImage}
                    closeLabel={dict.project.closeArtwork}
                    prevLabel={dict.project.prevSlide}
                    nextLabel={dict.project.nextSlide}
                    countTemplate={dict.project.imageCount}
                  />
                )}
              </section>
            ) : null}
          </Fragment>
        ))}

        {/* Gli output divisi in gruppi: per ognuno titolo, racconto e il suo mosaico */}
        {content.outputGroups?.length ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>{dict.project.output}</h2>
            {stickersAt("output")}
            {content.outputGroups.map((group, i) => {
              const t = caseText.outputGroups?.[i];
              return (
                <div key={t?.title ?? i} className={styles.group}>
                  {t ? (
                    <div className={styles.groupText}>
                      <h3>{t.title}</h3>
                      {t.text.split("\n").map((par) => (
                        <p key={par}>{par}</p>
                      ))}
                    </div>
                  ) : null}
                  <div className={content.outputWidth === "narrow" ? styles.narrow : undefined}>
                    <Mosaic
                      items={mosaicItems(group.tiles, t?.tiles ?? [], dict.project.placeholder)}
                      columns={group.columns}
                      openLabel={dict.project.openImage}
                      closeLabel={dict.project.closeArtwork}
                      prevLabel={dict.project.prevSlide}
                      nextLabel={dict.project.nextSlide}
                      countTemplate={dict.project.imageCount}
                    />
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}

        {/* Le stories di Instagram, ognuna nel suo telefono */}
        {content.phones?.length && caseText.phones ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>{caseText.phones.title}</h2>
            {stickersAt("phones")}
            {caseText.phones.text ? <p className={styles.blockText}>{caseText.phones.text}</p> : null}
            <PhoneStories
              label={caseText.phones.title}
              items={content.phones.map((phone, i) => ({
                key: phone.key,
                gif: phone.gif,
                label: caseText.phones?.items[i]?.label ?? "",
                alt: caseText.phones?.items[i]?.alt ?? "",
              }))}
            />
          </section>
        ) : null}

        {content.closing ? (
          <Picture
            name={content.closing}
            alt={caseText.closingAlt ?? ""}
            sizes="100vw"
            className={`${styles.wide} ${styles.closing}`}
          />
        ) : null}
      </div>
    </article>
  );
}
