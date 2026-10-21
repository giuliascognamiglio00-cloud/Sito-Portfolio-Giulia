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
  /**
   * Se c'è, il carosello avanza da solo ogni tot millisecondi e ricomincia dall'inizio dopo
   * l'ultima slide. Si ferma col mouse sopra, col focus dentro e fuori dallo schermo; un
   * pulsante lo mette in pausa, e toccarlo, trascinarlo o usare le frecce lo ferma. Con
   * "riduci animazioni" parte fermo
   */
  autoplay?: number;
  pauseLabel?: string;
  playLabel?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Striscia orizzontale di slide con scroll-snap: scorre col tocco, con le frecce, con la
 * tastiera e trascinando col mouse. Mostra la posizione (01 / 06) e una barra di avanzamento
 * che si completa sull'ultima slide.
 */
export default function Carousel({
  slides,
  label,
  hint,
  prevLabel,
  nextLabel,
  autoplay,
  pauseLabel = "Pause",
  playLabel = "Play",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Lo scorrimento automatico: `playing` è la scelta di chi guarda (il pulsante), `held` la
  // pausa momentanea (mouse sopra, focus dentro, carosello fuori dallo schermo)
  const [playing, setPlaying] = useState(Boolean(autoplay));
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const target = el.children[Math.max(0, Math.min(slides.length - 1, i))] as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = (el.children[0] as HTMLElement).offsetLeft;
    el.scrollTo({ left: target.offsetLeft - start, behavior: reduce ? "auto" : "smooth" });
  }, [slides.length]);

  // Chi interviene a mano prende il controllo: lo scorrimento automatico si ferma
  const go = (dir: 1 | -1) => {
    setPlaying(false);
    goTo(index + dir);
  };

  // Avanza solo quando il carosello è nello schermo. Con "riduci animazioni" non parte da solo:
  // alla prima occhiata resta in pausa, e il pulsante lo fa partire per chi lo vuole
  useEffect(() => {
    const el = root.current;
    if (!autoplay || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let first = true;
    const io = new IntersectionObserver(([entry]) => {
      if (first && reduce) setPlaying(false);
      first = false;
      setVisible(entry.isIntersecting);
    }, {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay]);

  useEffect(() => {
    if (!autoplay || !playing || held || !visible) return;
    const timer = window.setTimeout(
      () => goTo(index >= slides.length - 1 ? 0 : index + 1),
      autoplay,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, playing, held, visible, index, slides.length, goTo]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Col tocco basta lo scroll nativo: il trascinamento manuale serve solo al mouse
    setPlaying(false);
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
    <section
      ref={root}
      className={styles.carousel}
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className={styles.bar}>
        <p className={styles.hint}>{hint}</p>
        <div className={styles.controls}>
          {autoplay ? (
            <button
              type="button"
              className={styles.play}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? pauseLabel : playLabel}
            >
              {playing ? (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="3.5" y="3" width="3" height="10" rx="0.6" />
                  <rect x="9.5" y="3" width="3" height="10" rx="0.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
                </svg>
              )}
            </button>
          ) : null}
          {/* Mentre scorre da solo il numero non viene letto a ogni passo */}
          <span className={styles.count} aria-live={autoplay && playing ? "off" : "polite"}>
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
