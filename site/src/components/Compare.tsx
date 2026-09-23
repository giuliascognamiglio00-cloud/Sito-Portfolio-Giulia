"use client";

import { useState } from "react";
import styles from "./Compare.module.css";

type Props = {
  /** L'immagine sopra: si vede da sinistra fino al divisore */
  before: React.ReactNode;
  /** L'immagine sotto: si vede dal divisore fino a destra */
  after: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  /** Nome accessibile del cursore */
  sliderLabel: string;
  /** Testo annunciato dai lettori di schermo, con {value} al posto della percentuale */
  valueTextTemplate: string;
  title?: string;
  caption?: string;
};

/**
 * Confronto prima/dopo: due immagini sovrapposte e una barra verticale da trascinare da un
 * estremo all'altro. È un <input type="range"> trasparente steso su tutto il riquadro, così
 * trascinamento, tocco, frecce e semantica per i lettori di schermo li dà il browser.
 */
export default function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  sliderLabel,
  valueTextTemplate,
  title,
  caption,
}: Props) {
  const [pos, setPos] = useState(50);

  return (
    <figure className={styles.compare} style={{ "--pos": `${pos}%` } as React.CSSProperties}>
      <div className={styles.frame}>
        <div className={styles.layer}>{after}</div>
        <div className={`${styles.layer} ${styles.top}`}>{before}</div>

        <span className={`${styles.tag} ${styles.tagBefore}`}>{beforeLabel}</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>{afterLabel}</span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label={sliderLabel}
          aria-valuetext={valueTextTemplate.replace("{value}", String(pos))}
        />
        {/* Decorativa: il cursore sopra è trasparente, quello che si vede è questa */}
        <span className={styles.handle} aria-hidden="true" />
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
