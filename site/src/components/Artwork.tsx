"use client";

import { useRef } from "react";
import styles from "./Artwork.module.css";

type Props = {
  /** Il mockup, cioè quello che si vede nella pagina */
  children: React.ReactNode;
  /** L'opera piatta, che compare a schermo intero al clic */
  artwork: React.ReactNode;
  openLabel: string;
  closeLabel: string;
};

/**
 * Un mockup su cui si può cliccare per vedere l'artwork a schermo intero. Usa <dialog>, così
 * il tasto Esc, il fuoco della tastiera e il fondo oscurato li gestisce il browser.
 */
export default function Artwork({ children, artwork, openLabel, closeLabel }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => dialog.current?.showModal()}
        aria-label={openLabel}
      >
        {children}
        <span className={styles.badge} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <dialog
        ref={dialog}
        className={styles.dialog}
        // Il clic sul fondo scuro chiude: fuori dall'immagine il bersaglio è il dialog stesso
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        {artwork}
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
