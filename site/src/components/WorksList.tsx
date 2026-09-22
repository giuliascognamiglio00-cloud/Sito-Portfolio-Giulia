"use client";

import { useMemo, useState } from "react";
import type { Lang, Dictionary } from "@/lib/i18n";
import type { Project } from "@/content/types";
import ProjectCard from "./ProjectCard";
import Timeline from "./Timeline";
import styles from "./WorksList.module.css";

type Props = {
  professional: Project[];
  academic: Project[];
  lang: Lang;
  dict: Dictionary;
};

/**
 * Le due liste di progetti (Lavori e Accademia), con sopra la timeline per filtrarle per
 * anno. Il filtro è solo client-side: le liste restano quelle già ordinate dal più recente,
 * la timeline mostra solo gli anni che esistono davvero tra i progetti caricati.
 */
export default function WorksList({ professional, academic, lang, dict }: Props) {
  const years = useMemo(() => {
    const all = [...professional, ...academic].map((p) => p.date.slice(0, 4));
    return Array.from(new Set(all)).sort();
  }, [professional, academic]);

  const [year, setYear] = useState<string | null>(null);

  const byYear = (list: Project[]) => (year ? list.filter((p) => p.date.startsWith(year)) : list);
  const filteredWorks = byYear(professional);
  const filteredAcademic = byYear(academic);

  return (
    <>
      {/* Una timeline con un solo anno non serve a filtrare niente */}
      {years.length > 1 ? (
        <Timeline
          years={years}
          value={year}
          onChange={setYear}
          label={dict.works.timelineLabel}
          allLabel={dict.works.allYears}
        />
      ) : null}

      <h2 className={styles.group}>{dict.categories.works}</h2>
      {filteredWorks.length > 0 ? (
        <ul className={styles.grid}>
          {filteredWorks.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} lang={lang} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{year ? dict.works.emptyYear : dict.works.emptyWorks}</p>
      )}

      <h2 className={styles.group}>{dict.categories.academy}</h2>
      {filteredAcademic.length > 0 ? (
        <ul className={styles.grid}>
          {filteredAcademic.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} lang={lang} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{dict.works.emptyYear}</p>
      )}

      <p className={styles.note}>{dict.works.academyNote}</p>
    </>
  );
}
