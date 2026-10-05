import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import type { CaseTile, CaseTileText, Project, ProjectText } from "@/content/types";
import Picture from "./Picture";
import ToolIcon from "./ToolIcon";
import Mosaic, { type MosaicItem } from "./Mosaic";
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
      full: tile.key ? <Picture name={tile.key} alt={alt} sizes="90vw" /> : undefined,
    };
  });
}

/**
 * Pagina progetto con l'impostazione del wireframe definitivo: intestazione su foto,
 * Brief/Concept/Tools, moodboard, identità visiva e wireframe (se ci sono), mosaico degli
 * output e immagine di chiusura. Ogni riquadro dei mosaici apre l'anteprima al clic. Si attiva con `layout: "case"` nel file del progetto.
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

  return (
    <article style={{ "--acc": project.accent } as React.CSSProperties}>
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
          <h1 className={styles.title}>{text.title}</h1>
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
          {content.moodboard ? (
            <Picture
              name={content.moodboard}
              alt={caseText.moodboardAlt ?? ""}
              sizes="100vw"
              className={styles.wide}
            />
          ) : (
            <Placeholder label={dict.project.placeholder} className={styles.widePlaceholder} />
          )}
        </section>

        {/* Identità visiva e wireframe sono facoltativi; gli output ci sono sempre */}
        {mosaics.map((m) =>
          m.tiles?.length ? (
            <section key={m.title} className={styles.block}>
              <h2 className={styles.blockTitle}>{m.title}</h2>
              <Mosaic
                items={mosaicItems(m.tiles, m.texts ?? [], dict.project.placeholder)}
                openLabel={dict.project.openImage}
                closeLabel={dict.project.closeArtwork}
                prevLabel={dict.project.prevSlide}
                nextLabel={dict.project.nextSlide}
                countTemplate={dict.project.imageCount}
              />
            </section>
          ) : null,
        )}

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
