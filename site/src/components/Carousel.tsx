"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

export type CarouselSlide = {
  /** L'immagine (o altro contenuto) della slide */
  node: React.ReactNode;
  /** Testo breve sotto la slide, facoltativo */
  caption?: string;
};

type Props = {
  slides: CarouselSlide[];
  /** Nome accessibile dell'intero carosello */
  label: string;
  /** Suggerimento visibile, es. "Trascina per esplorare" */
  hint: string;
  prevLabel: string;
  nextLabel: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Striscia orizzontale di slide con scroll-snap: scorre col tocco, con le frecce, con la
 * tastiera e trascinando col mouse. Mostra la posizione (01 / 06) e una barra di avanzamento
 * che si completa sull'ultima slide.
 */
export default function Carousel({ slides, label, hint, prevLabel, nextLabel }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    const i = step > 0 ? Math.round(el.scrollLeft / step) : 0;
    // In fondo alla striscia l'ultima slide conta come corrente anche se non arriva a scattare
    setIndex(max > 0 && el.scrollLeft >= max - 2 ? slides.length - 1 : Math.min(slides.length - 1, i));
  }, [slides.length]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const target = el.children[Math.max(0, Math.min(slides.length - 1, index + dir))] as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = (el.children[0] as HTMLElement).offsetLeft;
    el.scrollTo({ left: target.offsetLeft - start, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Col tocco basta lo scroll nativo: il trascinamento manuale serve solo al mouse
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!drag.current || !el) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false); // riattiva lo snap, che porta la slide più vicina al bordo
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section className={styles.carousel} aria-label={label}>
      <div className={styles.bar}>
        <p className={styles.hint}>{hint}</p>
        <div className={styles.controls}>
          <span className={styles.count} aria-live="polite">
            {pad(index + 1)} / {pad(slides.length)}
          </span>
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label={prevLabel}>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === slides.length - 1}
            aria-label={nextLabel}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Il carosello si può scorrere con le frecce quando ha il focus */}
      <div
        ref={track}
        className={`${styles.track} ${dragging ? styles.dragging : ""}`}
        tabIndex={0}
        onScroll={update}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {slides.map((slide, i) => (
          <figure key={i} className={styles.slide}>
            <div className={styles.frame}>
              {slide.node}
              <span className={styles.num} aria-hidden="true">
                {pad(i + 1)}
              </span>
            </div>
            {slide.caption ? <figcaption>{slide.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      <div className={styles.progress} aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
    </section>
  );
}
