import styles from "./Hero.module.css";

/**
 * Apertura della home: nome a tutta larghezza sopra i blob sfocati e la grana.
 * I blob sono decorativi e vengono fermati da prefers-reduced-motion.
 */
export default function Hero({ role, lede }: { role: string; lede: string }) {
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
        <h1 className={styles.name}>
          <span>Giulia</span>
          <span>Scognamiglio</span>
        </h1>
        <div className={styles.role}>
          <span className={styles.pill}>{role}</span>
          <p className={styles.lede}>{lede}</p>
        </div>
      </div>
    </section>
  );
}
