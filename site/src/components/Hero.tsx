import Picture from "./Picture";
import styles from "./Hero.module.css";

/**
 * Apertura della home, a due colonne: nome, ruolo e presentazione a sinistra, foto a destra,
 * sopra i blob sfocati e la grana. I blob sono decorativi e vengono fermati da
 * prefers-reduced-motion. Sotto gli 820px la foto passa sotto il testo.
 */
export default function Hero({
  role,
  lede,
  portraitAlt,
}: {
  role: string;
  lede: string;
  portraitAlt: string;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.blobs} aria-hidden="true">
        <i className={styles.b1} />
        <i className={styles.b2} />
        <i className={styles.b3} />
        <i className={styles.b4} />
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.name}>
            <span>Giulia</span>
            <span>Scognamiglio</span>
          </h1>
          <p className={styles.role}>{role}</p>
          <p className={styles.lede}>{lede}</p>
        </div>
        {/* Il ritaglio è trasparente: sta direttamente sullo sfondo, senza riquadro */}
        <div className={styles.photo}>
          <Picture name="portrait" alt={portraitAlt} sizes="(max-width: 820px) 300px, 460px" priority />
        </div>
      </div>
    </section>
  );
}
