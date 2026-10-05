"use client";

import { useState } from "react";
import styles from "./OutputSwitch.module.css";

export type SwitchItem = {
  label: string;
  /** L'immagine grande, quando l'elemento è quello scelto */
  main: React.ReactNode;
  /** La miniatura nella colonna di sinistra */
  thumb: React.ReactNode;
};

type Props = {
  items: SwitchItem[];
  /** Nome accessibile del gruppo di miniature, es. "Scegli l'edizione" */
  label: string;
  /** "Mostra: {label}" */
  showTemplate: string;
};

/**
 * Le edizioni di una campagna, una per volta: la prima in grande, le altre come miniature
 * nella colonna di sinistra, una sopra l'altra. Cliccando una miniatura quella passa in
 * grande e quella che c'era prende il suo posto nella colonna. Al telefono le miniature
 * stanno sotto, affiancate.
 */
export default function OutputSwitch({ items, label, showTemplate }: Props) {
  const [current, setCurrent] = useState(0);
  const shown = items[current];

  return (
    <div className={styles.switch}>
      <ul className={styles.thumbs} aria-label={label}>
        {items.map((item, i) =>
          i === current ? null : (
            <li key={item.label}>
              <button
                type="button"
                className={styles.thumb}
                onClick={() => setCurrent(i)}
                aria-label={showTemplate.replace("{label}", item.label)}
              >
                {item.thumb}
                <span className={styles.tag}>{item.label}</span>
              </button>
            </li>
          ),
        )}
      </ul>

      <figure className={styles.main}>
        {/* La chiave fa ripartire la dissolvenza a ogni cambio */}
        <div key={current} className={styles.mainImg}>
          {shown.main}
        </div>
        <figcaption className={styles.tag} aria-live="polite">
          {shown.label}
        </figcaption>
      </figure>
    </div>
  );
}
