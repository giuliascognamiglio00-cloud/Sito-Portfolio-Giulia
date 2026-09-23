import type { SectionItem } from "@/content/types";
import SectionMedia from "./SectionMedia";
import styles from "./ImageGrid.module.css";

type Props = {
  items: SectionItem[];
  /** Nome accessibile dell'elenco */
  label: string;
  /** Etichetta dei pallini, per i riquadri con più immagini */
  goToTemplate: string;
  openArtworkLabel: string;
  closeArtworkLabel: string;
  /** Il primo riquadro occupa tutta la larghezza, come apertura della sezione */
  lead?: boolean;
};

/**
 * Griglia a due colonne con la didascalia sotto ogni immagine. Le immagini tengono la loro
 * proporzione vera, così nella stessa griglia convivono verticali e orizzontali.
 */
export default function ImageGrid({
  items,
  label,
  goToTemplate,
  openArtworkLabel,
  closeArtworkLabel,
  lead = false,
}: Props) {
  return (
    <ul className={`${styles.grid} ${lead ? styles.withLead : ""}`} aria-label={label}>
      {items.map((item, i) => (
        <li key={item.images[0].key} className={lead && i === 0 ? styles.lead : undefined}>
          <figure>
            <SectionMedia
              item={item}
              sizes={lead && i === 0 ? "100vw" : "(max-width: 700px) 100vw, 50vw"}
              className={styles.img}
              goToTemplate={goToTemplate}
              openArtworkLabel={openArtworkLabel}
              closeArtworkLabel={closeArtworkLabel}
            />
            {item.title || item.caption ? (
              <figcaption>
                {item.title ? <h3>{item.title}</h3> : null}
                {item.caption ? <p>{item.caption}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
