"use client";

import { useRef, useState } from "react";
import { useDragScroll } from "@/lib/useDragScroll";
import styles from "./BoardSlides.module.css";

type Props = {
  /** Le tavole, nell'ordine: la prima è quella che si vede all'apertura */
  slides: { label: string; node: React.ReactNode }[];
  /** Nome accessibile della striscia */
  label: string;
};

/**
 * Più tavole nello stesso riquadro della moodboard, una per volta. Si passa alla successiva
 * col pulsante che porta il suo nome (o col dito, o con le frecce quando la striscia ha il
 * fuoco); sull'ultima il pulsante riporta alla prima.
 */
export default function BoardSlides({ slides, label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  useDragScroll(track);
  const last = index === slides.length - 1;
  const target = last ? 0 : index + 1;

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={styles.boards}>
      <div
        ref={track}
        className={styles.track}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && !last) go(index + 1);
          if (e.key === "ArrowLeft" && index > 0) go(index - 1);
        }}
      >
        {slides.map((slide, i) => (
          <figure key={slide.label} className={styles.slide} aria-hidden={i !== index}>
            {slide.node}
            <figcaption className={styles.tag}>{slide.label}</figcaption>
          </figure>
        ))}
      </div>

      <button type="button" className={styles.next} onClick={() => go(target)}>
        {last ? <span aria-hidden="true">←</span> : null}
        {slides[target].label}
        {last ? null : <span aria-hidden="true">→</span>}
      </button>
    </div>
  );
}
