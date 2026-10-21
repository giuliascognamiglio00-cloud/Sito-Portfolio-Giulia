"use client";

import { useEffect, useRef, useState } from "react";
import { useDragScroll } from "@/lib/useDragScroll";
import Compare from "./Compare";
import styles from "./CompareSet.module.css";

type Pair = { label: string; before: React.ReactNode; after: React.ReactNode };

type Props = {
  pairs: Pair[];
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  valueTextTemplate: string;
  /** Il nome accessibile dell'elenco delle coppie */
  chooseLabel: string;
  prevLabel: string;
  nextLabel: string;
  /** "{n} di {total}" */
  countTemplate: string;
  caption?: string;
  frame?: "phone";
};

/**
 * Più confronti prima/dopo nello stesso riquadro: il confronto al centro, sotto le frecce e
 * l'elenco delle coppie da scegliere, come pillole. Si vede una coppia alla volta e il divisore resta dov'è
 * passando dall'una all'altra, così si confrontano schermate diverse allo stesso punto.
 * Le immagini delle altre coppie si scaricano solo quando si sceglie la loro voce.
 */
export default function CompareSet({
  pairs,
  beforeLabel,
  afterLabel,
  sliderLabel,
  valueTextTemplate,
  chooseLabel,
  prevLabel,
  nextLabel,
  countTemplate,
  caption,
  frame,
}: Props) {
  const [current, setCurrent] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  // Vero mentre la fila scorre perché l'ha spostata il codice, non chi guarda
  const auto = useRef(false);
  useDragScroll(list);

  // La pillola della schermata in vista sta sempre al centro della fila. Su desktop le
  // pillole vanno a capo e la fila non scorre: lo scorrimento qui non fa nulla
  useEffect(() => {
    const el = list.current;
    const pill = el?.children[current] as HTMLElement | undefined;
    if (!el || !pill) return;
    const left =
      el.scrollLeft +
      pill.getBoundingClientRect().left -
      el.getBoundingClientRect().left -
      (el.clientWidth - pill.offsetWidth) / 2;
    const max = el.scrollWidth - el.clientWidth;
    // Già al centro (o fila che non scorre): nessuno scroll, quindi nessuno scrollend
    if (Math.abs(Math.min(Math.max(left, 0), max) - el.scrollLeft) < 2) return;
    auto.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [current]);

  // Al contrario, al telefono la fila è un carosello: quando smette di scorrere, la pillola
  // che si ferma al centro sceglie la sua schermata. Se invece lo scorrimento era del codice
  // non sceglie nulla: lo scroll-snap a volte lo interrompe a metà (cambiando immagine), e
  // la pillola più vicina sarebbe ancora la precedente
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    let timer = 0;
    const settle = () => {
      if (auto.current) {
        auto.current = false;
        return;
      }
      if (el.scrollWidth <= el.clientWidth) return;
      const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      [...el.children].forEach((child, i) => {
        const r = child.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setCurrent(best);
    };
    // scrollend dove c'è; altrimenti si aspetta che gli eventi di scroll si fermino
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 140);
    };
    const native = "onscrollend" in window;
    el.addEventListener(native ? "scrollend" : "scroll", native ? settle : onScroll);
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener(native ? "scrollend" : "scroll", native ? settle : onScroll);
    };
  }, []);
  const pair = pairs[current];
  const go = (by: number) => setCurrent((i) => (i + by + pairs.length) % pairs.length);

  return (
    <div className={`${styles.set} ${frame === "phone" ? styles.phone : ""}`}>
      {caption ? <p className={styles.caption}>{caption}</p> : null}
      <div className={styles.stage}>
        <Compare
          before={pair.before}
          after={pair.after}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
          sliderLabel={`${sliderLabel}: ${pair.label}`}
          valueTextTemplate={valueTextTemplate}
          frame={frame}
        />
        <div className={styles.nav}>
          <button type="button" onClick={() => go(-1)} aria-label={prevLabel}>
            <span aria-hidden="true">←</span>
          </button>
          <span className={styles.count} aria-live="polite">
            {countTemplate
              .replace("{n}", String(current + 1))
              .replace("{total}", String(pairs.length))}
            <span className={styles.srOnly}>: {pair.label}</span>
          </span>
          <button type="button" onClick={() => go(1)} aria-label={nextLabel}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ol ref={list} className={styles.list} aria-label={chooseLabel}>
        {pairs.map((p, i) => (
          <li key={p.label}>
            <button
              type="button"
              aria-pressed={i === current}
              onClick={() => setCurrent(i)}
            >
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
