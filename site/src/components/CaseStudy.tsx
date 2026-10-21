import { Fragment } from "react";
import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import type {
  CaseTile,
  CaseTileText,
  Project,
  ProjectText,
  StorySection,
} from "@/content/types";
import Picture, { imageShape } from "./Picture";
import ToolIcon from "./ToolIcon";
import Mosaic, { type MosaicItem } from "./Mosaic";
import PhoneStories from "./PhoneStories";
import ProjectVideo from "./ProjectVideo";
import Compare from "./Compare";
import CompareSet from "./CompareSet";
import Carousel from "./Carousel";
import BoardSlides from "./BoardSlides";
import OutputSwitch from "./OutputSwitch";
import Tentacles from "./Tentacles";
import Floaters from "./Floaters";
import Laptop from "./Laptop";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project;
  text: ProjectText;
  dict: Dictionary;
  lang: Lang;
  /** Il progetto che segue, per la sezione di fine pagina */
  next: Project;
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
export default function CaseStudy({ project, text, dict, lang, next }: Props) {
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

  // Il confronto prima/dopo. Una coppia sola a tutta larghezza (Oculus); più coppie con
  // le pillole per sceglierle sotto (Doggo e Muta, dal wireframe all'app o al sito). Dove ci sono i wireframe
  // sta subito dopo di loro, perché racconta come sono diventati l'app
  const cmp = project.compare;
  const cmpText = text.compare;
  // Il telefono è stretto; le schermate del sito (Muta) occupano il centro della pagina
  const cmpSizes =
    cmp?.frame === "phone" ? "(max-width: 820px) 70vw, 320px" : "(max-width: 820px) 90vw, 832px";
  const compare =
    cmp && cmpText ? (
      <section className={styles.block}>
        <h2 className={styles.blockTitle}>{cmpText.title}</h2>
        {cmp.more?.length ? (
          <CompareSet
            frame={cmp.frame}
            pairs={[
              { before: cmp.before, after: cmp.after, label: cmpText.label ?? "", beforeAlt: cmpText.beforeAlt, afterAlt: cmpText.afterAlt },
              ...cmp.more.map((m, i) => ({ ...m, ...cmpText.more?.[i] })),
            ].map((p) => ({
              label: p.label ?? "",
              before: <Picture name={p.before} alt={p.beforeAlt ?? ""} sizes={cmpSizes} />,
              after: <Picture name={p.after} alt={p.afterAlt ?? ""} sizes={cmpSizes} />,
            }))}
            beforeLabel={cmpText.beforeLabel ?? dict.project.compareBefore}
            afterLabel={cmpText.afterLabel ?? dict.project.compareAfter}
            sliderLabel={dict.project.compareLabel}
            valueTextTemplate={dict.project.compareValue}
            chooseLabel={dict.project.compareChoose}
            prevLabel={dict.project.prevSlide}
            nextLabel={dict.project.nextSlide}
            countTemplate={dict.project.imageCount}
            caption={cmpText.caption}
          />
        ) : (
          <Compare
            frame={cmp.frame}
            before={<Picture name={cmp.before} alt={cmpText.beforeAlt} sizes="100vw" />}
            after={<Picture name={cmp.after} alt={cmpText.afterAlt} sizes="100vw" />}
            beforeLabel={cmpText.beforeLabel ?? dict.project.compareBefore}
            afterLabel={cmpText.afterLabel ?? dict.project.compareAfter}
            sliderLabel={dict.project.compareLabel}
            valueTextTemplate={dict.project.compareValue}
            caption={cmpText.caption}
          />
        )}
      </section>
    ) : null;

  // Le sezioni di racconto che stanno in un punto della pagina, nell'ordine in cui sono scritte
  const storyAt = (at: StorySection["at"]) =>
    caseText.story
      ?.filter((section) => section.at === at)
      .map((section) => (
        <section key={section.title} className={styles.story}>
          <h2 className={styles.storyTitle}>{section.title}</h2>
          <div className={styles.storyBody}>
            {section.blocks.map((block, i) =>
              typeof block === "string" ? (
                <p key={i}>{block}</p>
              ) : (
                <p key={i} className={styles.quote}>
                  {block.quote}
                </p>
              ),
            )}
            {section.cards?.length ? (
              // Al telefono tre schede stanno su una riga, quattro in una griglia 2×2
              <ul className={styles.cards} data-count={section.cards.length}>
                {section.cards.map((card) => (
                  <li key={card.title}>
                    <h3>
                      {card.title}
                      {card.meta ? <span>{card.meta}</span> : null}
                    </h3>
                    <p>{card.text}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ));

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
            {text.intro.split("\n").map((par) => (
              <p key={par}>{par}</p>
            ))}
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

        {storyAt("intro")}

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

        {/* Il confronto prima/dopo, dove c'è: qui, a meno che non ci siano i wireframe */}
        {content.wireframes?.length ? null : compare}

        {/* Identità visiva e wireframe sono facoltativi; gli output ci sono sempre. Il
            video, dove c'è, sta subito dopo l'identità visiva, prima di wireframe e output */}
        {mosaics.map((m, i) => (
          <Fragment key={m.title}>
            {i === 1 ? video : null}
            {m.title === dict.project.wireframes && m.tiles?.length ? storyAt("wireframes") : null}
            {m.title === dict.project.output && m.tiles?.length ? storyAt("output") : null}
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
                    slideOnMobile={m.title === dict.project.wireframes}
                    openLabel={dict.project.openImage}
                    closeLabel={dict.project.closeArtwork}
                    prevLabel={dict.project.prevSlide}
                    nextLabel={dict.project.nextSlide}
                    countTemplate={dict.project.imageCount}
                  />
                )}
              </section>
            ) : null}
            {m.title === dict.project.wireframes && m.tiles?.length ? compare : null}
          </Fragment>
        ))}

        {content.outputGroups?.length ? storyAt("output") : null}

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
                  {/* Il carosello del gruppo, dove c'è: foto verticali, senza riquadro */}
                  {group.carousel?.length ? (
                    <div
                      className={styles.groupCarousel}
                      style={{ "--shot": "4 / 5" } as React.CSSProperties}
                    >
                      <Carousel
                        label={t?.title ?? dict.project.output}
                        hint={dict.project.drag}
                        autoplay={group.autoplay ? 3500 : undefined}
                        pauseLabel={dict.project.pauseCarousel}
                        playLabel={dict.project.playCarousel}
                        prevLabel={dict.project.prevSlide}
                        nextLabel={dict.project.nextSlide}
                        slides={group.carousel.map((key, c) => ({
                          node: (
                            <Picture
                              name={key}
                              alt={t?.carousel?.[c]?.alt ?? ""}
                              sizes="(max-width: 640px) 68vw, 272px"
                            />
                          ),
                          caption: t?.carousel?.[c]?.caption,
                        }))}
                      />
                    </div>
                  ) : null}
                  {/* Le pagine del sito nei MacBook, da scorrere dentro lo schermo */}
                  {group.laptops?.length ? (
                    <div className={styles.laptops}>
                      {group.laptops.map((page, l) => (
                        <Laptop
                          key={page}
                          page={page}
                          label={t?.laptops?.[l]?.label ?? ""}
                          alt={t?.laptops?.[l]?.alt ?? ""}
                          hint={dict.project.scrollScreen}
                        />
                      ))}
                    </div>
                  ) : null}
                  {group.tiles.length ? (
                  <div className={content.outputWidth === "narrow" ? styles.narrow : undefined}>
                    <Mosaic
                      items={mosaicItems(group.tiles, t?.tiles ?? [], dict.project.placeholder)}
                      columns={group.columns}
                      bare={group.bare}
                      openLabel={dict.project.openImage}
                      closeLabel={dict.project.closeArtwork}
                      prevLabel={dict.project.prevSlide}
                      nextLabel={dict.project.nextSlide}
                      countTemplate={dict.project.imageCount}
                    />
                  </div>
                  ) : null}
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

        {storyAt("end")}

        {content.prototype ? (
          <p className={styles.prototype}>
            <a href={content.prototype} target="_blank" rel="noopener noreferrer">
              {dict.project.prototype} <span aria-hidden="true">↗</span>
            </a>
          </p>
        ) : null}

        {/* Fine pagina: il prossimo progetto e il ritorno all'elenco */}
        {next ? (
          <nav className={styles.end} aria-label={dict.common.nextProject}>
            <Link
              href={routes.project(lang, next.slug)}
              className={styles.next}
              style={{ "--acc": next.accent } as React.CSSProperties}
            >
              <span className={styles.nextText}>
                <small>{dict.common.nextProject}</small>
                <span className={styles.nextTitle}>{next.content[lang].title}</span>
                <span className={styles.nextArrow} aria-hidden="true">→</span>
              </span>
              <Picture name={next.cover} alt="" sizes="(max-width: 640px) 40vw, 288px" />
            </Link>
            <Link href={routes.works(lang)} className={styles.all}>
              <span aria-hidden="true">←</span> {dict.common.backToWorks}
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
