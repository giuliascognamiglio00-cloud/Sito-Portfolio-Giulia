"use client";

import styles from "./Timeline.module.css";

type Props = {
  /** Anni distinti trovati nei progetti, dal più vecchio al più recente */
  years: string[];
  /** Anno selezionato, o null per "tutti" */
  value: string | null;
  onChange: (year: string | null) => void;
  label: string;
  allLabel: string;
};

/**
 * Linea del tempo per filtrare i progetti per anno. È solo un filtro, non cambia l'ordine
 * delle liste sotto: quelle restano dal più recente, come dice l'introduzione della pagina.
 * Cresce da sola quando un progetto prende una data di un anno nuovo.
 */
export default function Timeline({ years, value, onChange, label, allLabel }: Props) {
  return (
    <nav className={styles.timeline} aria-label={label}>
      <ul className={styles.track}>
        <li>
          <button
            type="button"
            className={styles.point}
            aria-pressed={value === null}
            onClick={() => onChange(null)}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.year}>{allLabel}</span>
          </button>
        </li>
        {years.map((year) => (
          <li key={year}>
            <button
              type="button"
              className={styles.point}
              aria-pressed={value === year}
              onClick={() => onChange(value === year ? null : year)}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.year}>{year}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
