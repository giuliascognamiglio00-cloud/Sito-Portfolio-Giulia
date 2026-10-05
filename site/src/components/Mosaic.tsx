"use client";

import { useRef, useState } from "react";
import styles from "./Mosaic.module.css";

export type MosaicItem = {
  /** Quello che si vede nel riquadro: l'immagine ritagliata o il segnaposto */
  node: React.ReactNode;
  /** L'immagine intera per l'anteprima. Senza, il riquadro non è cliccabile (i segnaposto) */
  full?: React.ReactNode;
  label: string;
  cols: 1 | 2;
  rows: 1 | 2;
};

type Props = {
  items: MosaicItem[];
  /** Su quante colonne sta il mosaico (3 se non indicato); al telefono sempre una */
  columns?: 2 | 3 | 4;
  openLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  /** "{n} di {total}" */
  countTemplate: string;
};

/**
 * Il mosaico a tre colonne con le etichette sui riquadri. Cliccando un'immagine si apre
 * l'anteprima a tutto schermo, e da lì si scorre alle altre dello stesso mosaico con i
 * pulsanti, con le frecce della tastiera o col dito. Come in Artwork, la finestra è un
 * <dialog>: Esc, fuoco e fondo oscurato li gestisce il browser.
 */
export default function Mosaic({
  items,
  columns = 3,
  openLabel,
  closeLabel,
  prevLabel,
  nextLabel,
  countTemplate,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  // Si scorrono solo i riquadri con un'immagine vera
  const viewable = items.flatMap((item, i) => (item.full ? [i] : []));
  const [current, setCurrent] = useState(0);

  const open = (i: number) => {
    setCurrent(viewable.indexOf(i));
    dialog.current?.showModal();
  };
  const step = (by: number) =>
    setCurrent((c) => (c + by + viewable.length) % viewable.length);

  const shown = items[viewable[current]];

  return (
    <>
      <ul className={styles.mosaic} style={{ "--n": columns } as React.CSSProperties}>
        {items.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            className={item.rows === 2 && item.cols !== 2 ? styles.tall : undefined}
            style={{ "--cols": item.cols, "--rows": item.rows } as React.CSSProperties}
          >
            <figure className={styles.tile}>
              {item.full ? (
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => open(i)}
                  aria-label={`${openLabel}: ${item.label}`}
                  aria-haspopup="dialog"
                >
                  {item.node}
                </button>
              ) : (
                item.node
              )}
              {item.label ? <figcaption className={styles.label}>{item.label}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={shown?.label}
        onClick={(e) => {
          // Il clic sul fondo scuro chiude: fuori dall'immagine il bersaglio è il dialog stesso
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {shown ? (
          <figure className={styles.view}>
            {/* La chiave forza un'immagine nuova a ogni passo, invece di riusare la vecchia */}
            <div key={viewable[current]} className={styles.full}>
              {shown.full}
            </div>
            <figcaption className={styles.caption}>
              <span>{shown.label}</span>
              <span aria-live="polite">
                {countTemplate
                  .replace("{n}", String(current + 1))
                  .replace("{total}", String(viewable.length))}
              </span>
            </figcaption>
          </figure>
        ) : null}

        {viewable.length > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => step(-1)}
              aria-label={prevLabel}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={() => step(1)}
              aria-label={nextLabel}
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : null}

        <button
          type="button"
          className={styles.close}
          onClick={() => dialog.current?.close()}
          aria-label={closeLabel}
        >
          <span aria-hidden="true">×</span>
        </button>
      </dialog>
    </>
  );
}
