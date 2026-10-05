import Picture, { imageShape, largestSrc } from "./Picture";
import styles from "./PhoneStories.module.css";

export type PhoneStory = {
  /** Immagine in assets/img: la storia ferma, o il primo fotogramma se c'è una GIF */
  key: string;
  /** GIF animata in public/anim, senza estensione. Con "riduci animazioni" resta l'immagine ferma */
  gif?: string;
  label: string;
  alt: string;
};

/**
 * Stories di Instagram dentro un telefono disegnato in CSS, una accanto all'altra. Lo
 * schermo prende la proporzione vera di ogni storia, così niente viene tagliato.
 */
export default function PhoneStories({ items, label }: { items: PhoneStory[]; label: string }) {
  return (
    <ul className={styles.row} aria-label={label}>
      {items.map((item) => {
        const shape = imageShape(item.key);
        return (
          <li key={item.key}>
            <figure className={styles.phone}>
              <div
                className={styles.device}
                style={{ "--ratio": shape?.ratio ?? "9 / 19" } as React.CSSProperties}
              >
                {item.gif ? (
                  <picture>
                    {/* Chi ha chiesto meno animazioni vede il primo fotogramma, fermo */}
                    <source srcSet={largestSrc(item.key)} media="(prefers-reduced-motion: reduce)" />
                    <img
                      className={styles.screen}
                      src={`/anim/${item.gif}.gif`}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                ) : (
                  <Picture
                    name={item.key}
                    alt={item.alt}
                    sizes="(max-width: 640px) 70vw, 260px"
                    className={styles.screen}
                  />
                )}
              </div>
              <figcaption className={styles.label}>{item.label}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
