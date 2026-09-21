import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import type { Project } from "@/content/types";
import Picture from "./Picture";
import styles from "./ProjectCard.module.css";

/** Scheda di un progetto per l'indice e la home. */
export default function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const text = project.content[lang];
  return (
    <Link
      href={routes.project(lang, project.slug)}
      className={styles.card}
      style={{ "--acc": project.accent } as React.CSSProperties}
    >
      <div className={styles.frame}>
        <Picture
          name={project.cover}
          alt={text.coverAlt}
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.img}
        />
      </div>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.kind}>{text.kind}</p>
    </Link>
  );
}
