import Picture from "./Picture";
import styles from "./Tentacles.module.css";

type Props = { items: { key: string; at: "title" | "tools" }[] };

/**
 * I tentacoli di Oculus: entrano dai bordi dello schermo, uno a sinistra tra intestazione e
 * brief, uno a destra tra gli strumenti e la moodboard. Si muovono come qualcosa di vivo:
 * ognuno ondeggia dalla sua base con un ritmo irregolare, e un filtro SVG (turbolenza che
 * cambia piano) lo fa ondulare lungo tutta la lunghezza. Solo decorazione: nascosti ai
 * lettori di schermo, non cliccabili, fermi con "riduci animazioni".
 */
export default function Tentacles({ items }: Props) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {items.map((item) => (
        <div key={item.key} className={`${styles.tentacle} ${styles[item.at]}`}>
          <div className={styles.sway}>
            <Picture name={item.key} alt="" sizes="340px" className={styles.img} />
          </div>
        </div>
      ))}
      <svg className={styles.defs} focusable="false">
        <filter id="tentacle-wave" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.007 0.011" numOctaves="2" seed="4">
            <animate
              attributeName="baseFrequency"
              dur="12s"
              values="0.007 0.011;0.0085 0.0125;0.0065 0.0105;0.007 0.011"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
