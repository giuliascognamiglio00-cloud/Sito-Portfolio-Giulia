"use client";

import { useState } from "react";
import styles from "./Timeline.module.css";

type Props = {
  /** Anni distinti trovati nei progetti, dal più vecchio al più recente */
  years: string[];
  /** Anno selezionato, o null per "tutti" */
  value: string | null;
  onChange: (year: string | null) => void;
  label: string;
  allLabel: string;
  /** Etichetta del pulsante che, al telefono, apre la linea del tempo */
  exploreLabel: string;
};

/**
 * Linea del tempo per filtrare i progetti per anno. È solo un filtro, non cambia l'ordine
 * delle liste sotto: quelle restano dal più recente, come dice l'introduzione della pagina.
 * Cresce da sola quando un progetto prende una data di un anno nuovo.
 *
 * Al telefono è chiusa in un pulsante "Esplora": aprendola la pillola si allunga con un
 * rimbalzo e i pallini, che partono ammucchiati, si separano come gocce (un filtro SVG
 * "goo" li fonde finché sono vicini) fino a disporsi alla stessa distanza. Le etichette
 * compaiono quando il movimento è finito, per non passare anche loro dal filtro.
 */
export default function Timeline({
  years,
  value,
  onChange,
  label,
  allLabel,
  exploreLabel,
}: Props) {
  // closed → opening (si allunga, filtro attivo) → open (etichette visibili)
  const [state, setState] = useState<"closed" | "opening" | "open">("closed");

  const toggle = () => {
    if (state !== "closed") return setState("closed");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState(reduced ? "open" : "opening");
  };

  const points = [
    { key: "all", text: allLabel, pressed: value === null, pick: () => onChange(null) },
    ...years.map((year) => ({
      key: year,
      text: year,
      pressed: value === year,
      pick: () => onChange(value === year ? null : year),
    })),
  ];

  return (
    <nav
      className={styles.timeline}
      data-state={state}
      aria-label={label}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "width" && state === "opening") {
          setState("open");
        }
      }}
    >
      {/* Solo al telefono: apre e chiude la linea del tempo */}
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={state !== "closed"}
        onClick={toggle}
      >
        <span className={styles.toggleIcon} aria-hidden="true" />
        <span className={styles.toggleText}>{exploreLabel}</span>
      </button>

      <ul className={styles.track}>
        {points.map((point) => (
          <li key={point.key}>
            <button
              type="button"
              className={styles.point}
              aria-pressed={point.pressed}
              onClick={point.pick}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.year}>{point.text}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Il filtro che fa sembrare liquidi i pallini mentre si separano */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <filter id="timeline-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          />
        </filter>
      </svg>
    </nav>
  );
}
