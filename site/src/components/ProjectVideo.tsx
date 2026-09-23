"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./ProjectVideo.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";

const subscribeToMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;

type Props = {
  /** Percorso del file in public/video */
  src: string;
  /** Percorso dell'immagine di copertina */
  poster: string;
  /** Proporzione del video, es. "1080 / 628": tiene lo spazio prima che il file si carichi */
  ratio: string;
  /** Se il video è verticale sta in una colonna più stretta, altrimenti sarebbe altissimo */
  portrait: boolean;
  title?: string;
  caption?: string;
  soundOnLabel: string;
  soundOffLabel: string;
  replayLabel: string;
};

/**
 * Video di progetto: parte da solo, muto e in loop quando entra nello schermo, e si ferma
 * quando esce — così non consuma dati di chi non lo guarda. Un pulsante accende l'audio.
 * Con "riduci animazioni" non parte da solo: compaiono i controlli normali del browser.
 */
export default function ProjectVideo({
  src,
  poster,
  ratio,
  portrait,
  title,
  caption,
  soundOnLabel,
  soundOffLabel,
  replayLabel,
}: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  // Sul server non sappiamo cosa preferisca chi guarda: partiamo dal caso normale
  const manual = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => false);

  useEffect(() => {
    const el = video.current;
    if (!el || manual) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() può essere rifiutata (per esempio in risparmio energetico): non è un errore
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [manual]);

  const restart = () => {
    const el = video.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => {});
  };

  const toggleSound = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) void el.play().catch(() => {});
  };

  return (
    <figure
      className={`${styles.video} ${portrait ? styles.portrait : ""}`}
      style={{ "--video-shot": ratio } as React.CSSProperties}
    >
      <div className={styles.frame}>
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={manual}
        />
        {manual ? null : (
          <>
            {/* Steso su tutto il riquadro: cliccare il video lo fa ripartire da capo. È un
                bottone vero, così ci si arriva anche con la tastiera */}
            <button
              type="button"
              className={styles.replay}
              onClick={restart}
              aria-label={replayLabel}
            />
            <button
              type="button"
              className={styles.sound}
              onClick={toggleSound}
              aria-label={muted ? soundOnLabel : soundOffLabel}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {muted ? (
                  <path
                    d="M16 9.5l4.5 5m0-5l-4.5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.5 7c2.2 2.8 2.2 7.2 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {title || caption ? (
        <figcaption>
          {title ? <strong>{title}</strong> : null}
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
