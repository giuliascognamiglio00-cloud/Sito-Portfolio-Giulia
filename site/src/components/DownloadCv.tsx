"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DownloadCv.module.css";

type State = "idle" | "loading" | "done";

/**
 * Bottone di scaricamento del CV. Al clic la freccia scivola via, il bottone si stringe e si
 * riapre con la spunta, poi torna com'era. Resta un normale link con `download`: se il
 * JavaScript non è ancora pronto il file si scarica lo stesso, senza animazione.
 */
export default function DownloadCv({
  href,
  label,
  doneLabel,
}: {
  href: string;
  label: string;
  doneLabel: string;
}) {
  const [state, setState] = useState<State>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = () => {
    if (state !== "idle") return;
    setState("loading");
    timers.current = [
      window.setTimeout(() => setState("done"), 700),
      window.setTimeout(() => setState("idle"), 2800),
    ];
  };

  return (
    <a href={href} download onClick={start} className={`${styles.cv} ${styles[state]}`}>
      {/* Il nome accessibile del link resta sempre questo: gli stati sono solo visivi */}
      <span className={styles.rest}>
        {label}
        <i className={styles.arrow} aria-hidden="true">
          ↓
        </i>
      </span>
      <span className={styles.dots} aria-hidden="true" />
      <span className={styles.check} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={styles.tick}>
          <path
            d="M4 12.5l5 5L20 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {doneLabel}
      </span>
    </a>
  );
}
