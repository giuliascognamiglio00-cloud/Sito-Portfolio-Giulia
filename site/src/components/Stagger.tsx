import type { SectionItem } from "@/content/types";
import SectionMedia from "./SectionMedia";
import styles from "./Stagger.module.css";

type Props = {
  items: SectionItem[];
  /** Nome accessibile dell'elenco */
  label: string;
  /** Livello dei titoli: h3 quando la sezione ha già un suo h2 sopra */
  headings?: "h2" | "h3";
  /** Etichetta dei pallini, per i riquadri con più immagini */
  goToTemplate: string;
  openArtworkLabel: string;
  closeArtworkLabel: string;
};

/**
 * Immagini una sotto l'altra, a lati alterni e sfalsate, con titolo e descrizione di fianco.
 * Le immagini tengono la loro proporzione vera, così convivono orizzontali e verticali.
 */
export default function Stagger({
  items,
  label,
  headings = "h2",
  goToTemplate,
  openArtworkLabel,
  closeArtworkLabel,
}: Props) {
  const Heading = headings;

  return (
    <ul className={styles.stagger} aria-label={label}>
      {items.map((item) => (
        <li key={item.images[0].key}>
          <figure>
            <SectionMedia
              item={item}
              sizes="(max-width: 760px) 100vw, 58vw"
              className={styles.img}
              goToTemplate={goToTemplate}
              openArtworkLabel={openArtworkLabel}
              closeArtworkLabel={closeArtworkLabel}
            />
            {item.title || item.caption ? (
              <figcaption>
                {item.title ? <Heading>{item.title}</Heading> : null}
                {item.caption ? <p>{item.caption}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
