import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import type { Project, ProjectText } from "@/content/types";
import Picture from "./Picture";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project;
  text: ProjectText;
  dict: Dictionary;
  lang: Lang;
  /** "05": la posizione del progetto nell'elenco */
  number: string;
  prev: Project;
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
 * Pagina progetto con l'impostazione del wireframe definitivo: intestazione su foto,
 * Brief/Concept/Tools, moodboard, mosaico degli output, immagine di chiusura e la barra
 * progetto precedente/successivo. Si attiva con `layout: "case"` nel file del progetto.
 */
export default function CaseStudy({ project, text, dict, lang, number, prev, next }: Props) {
  const content = project.case ?? { output: [] };
  const caseText = text.case ?? { output: [] };
  const tools = text.tools.split(",").map((tool) => tool.trim()).filter(Boolean);

  return (
    <article style={{ "--acc": project.accent } as React.CSSProperties}>
      <header className={styles.head}>
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
          <p className={styles.number}>
            {dict.project.number} {number}
          </p>
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
            </section>
          ) : null}
          <section>
            <h2>{dict.project.tools}</h2>
            <ul className={styles.tools}>
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
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

        {content.output.length > 0 ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>{dict.project.output}</h2>
            <ul className={styles.output}>
              {content.output.map((tile, i) => {
                const t = caseText.output[i];
                const label = t?.label ?? "";
                return (
                  <li
                    key={`${label}-${i}`}
                    className={tile.rows === 2 ? styles.tall : undefined}
                    style={
                      {
                        "--cols": tile.cols ?? 1,
                        "--rows": tile.rows ?? 1,
                      } as React.CSSProperties
                    }
                  >
                    <figure className={styles.tile}>
                      {tile.key ? (
                        <Picture
                          name={tile.key}
                          alt={t?.alt ?? ""}
                          sizes={
                            tile.cols === 2
                              ? "(max-width: 640px) 100vw, 60vw"
                              : "(max-width: 640px) 100vw, 30vw"
                          }
                          className={styles.tileImg}
                        />
                      ) : (
                        <Placeholder label={dict.project.placeholder} />
                      )}
                      {label ? <figcaption className={styles.label}>{label}</figcaption> : null}
                    </figure>
                  </li>
                );
              })}
            </ul>
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

      <nav className={styles.pager} aria-label={dict.project.projectNav}>
        <div className={`wrap ${styles.pagerInner}`}>
          <Link href={routes.project(lang, prev.slug)} className={styles.prev}>
            <span className={styles.pagerLabel}>
              <span aria-hidden="true">← </span>
              {dict.project.prevProject}
            </span>
            <span className={styles.pagerTitle}>{prev.content[lang].title}</span>
          </Link>
          <span className={styles.signature}>Giulia Scognamiglio</span>
          <Link href={routes.project(lang, next.slug)} className={styles.next}>
            <span className={styles.pagerLabel}>
              {dict.project.nextProject}
              <span aria-hidden="true"> →</span>
            </span>
            <span className={styles.pagerTitle}>{next.content[lang].title}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
