"use client";

import { useMemo, useState } from "react";
import type { Lang, Dictionary } from "@/lib/i18n";
import type { Area, Project } from "@/content/types";
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
 * Le due liste di progetti (Lavori e Progetti accademici), con sopra la timeline per
 * filtrarle per anno e le pillole per filtrarle per macroarea. I filtri si sommano e sono
 * solo client-side: le liste restano quelle già ordinate dal più recente. Timeline e
 * pillole mostrano solo gli anni e le macroaree che esistono davvero tra i progetti.
 *
 * Le pillole si aprono dall'icona dei filtri accanto alla timeline; al telefono anche la
 * timeline è chiusa, in un pulsante "Esplora".
 */
export default function WorksList({ professional, academic, lang, dict }: Props) {
  const all = useMemo(() => [...professional, ...academic], [professional, academic]);

  const years = useMemo(
    () => Array.from(new Set(all.map((p) => p.date.slice(0, 4)))).sort(),
    [all],
  );
  // Nell'ordine dei dizionari, che è lo stesso delle etichette nelle pagine progetto
  const areas = useMemo(
    () =>
      (Object.keys(dict.areas) as Area[]).filter((area) =>
        all.some((p) => p.areas.includes(area)),
      ),
    [all, dict.areas],
  );

  const [year, setYear] = useState<string | null>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filter = (list: Project[]) =>
    list.filter(
      (p) => (!year || p.date.startsWith(year)) && (!area || p.areas.includes(area)),
    );
  const filteredWorks = filter(professional);
  const filteredAcademic = filter(academic);
  const filtered = Boolean(year || area);

  return (
    <>
      <div className={styles.toolbar}>
        {/* Una timeline con un solo anno non serve a filtrare niente */}
        {years.length > 1 ? (
          <Timeline
            years={years}
            value={year}
            onChange={setYear}
            label={dict.works.timelineLabel}
            allLabel={dict.works.allYears}
            exploreLabel={dict.works.explore}
          />
        ) : null}

        {/* Apre e chiude le pillole delle macroaree */}
        <button
          type="button"
          className={styles.filterToggle}
          aria-expanded={filtersOpen}
          aria-controls="area-filters"
          aria-label={dict.works.filters}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="8" cy="17" r="2" />
          </svg>
          {area ? <span className={styles.filterBadge} aria-hidden="true" /> : null}
        </button>
      </div>

      <div
        id="area-filters"
        role="group"
        aria-label={dict.works.areaFilterLabel}
        className={styles.areas}
        data-open={filtersOpen}
      >
        <button
          type="button"
          className={styles.pill}
          aria-pressed={area === null}
          onClick={() => setArea(null)}
        >
          {dict.works.allAreas}
        </button>
        {areas.map((a) => (
          <button
            key={a}
            type="button"
            className={styles.pill}
            aria-pressed={area === a}
            onClick={() => setArea(area === a ? null : a)}
          >
            {dict.areas[a]}
          </button>
        ))}
      </div>

      <section>
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
          <p className={styles.empty}>
            {filtered ? dict.works.emptyFiltered : dict.works.emptyWorks}
          </p>
        )}
      </section>

      <section>
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
          <p className={styles.empty}>{dict.works.emptyFiltered}</p>
        )}
      </section>

      <p className={styles.note}>{dict.works.academyNote}</p>
    </>
  );
}
