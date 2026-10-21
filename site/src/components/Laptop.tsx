import Picture from "./Picture";
import styles from "./Laptop.module.css";

type Props = {
  /** La cattura intera della pagina, in assets/img */
  page: string;
  alt: string;
  label: string;
  /** "Scorri dentro lo schermo" */
  hint: string;
};

/**
 * Una pagina di un sito dentro un MacBook. La cattura è lunga quanto la pagina vera e si
 * scorre dentro lo schermo, con la rotella, col dito o, dato il fuoco, con le frecce. La
 * cornice (macbook_frame, schermo trasparente) sta sopra e lascia passare il puntatore.
 */
export default function Laptop({ page, alt, label, hint }: Props) {
  return (
    <figure className={styles.laptop}>
      <div className={styles.device}>
        {/* Una regione che scorre deve poter ricevere il fuoco, o da tastiera non si scorre */}
        <div className={styles.screen} tabIndex={0} role="region" aria-label={`${label}: ${hint}`}>
          <Picture name={page} alt={alt} sizes="(max-width: 760px) 80vw, 40vw" />
        </div>
        <Picture name="macbook_frame" alt="" sizes="(max-width: 760px) 95vw, 48vw" className={styles.frame} />
      </div>
      <figcaption>
        <strong>{label}</strong> <span aria-hidden="true">· {hint}</span>
      </figcaption>
    </figure>
  );
}
