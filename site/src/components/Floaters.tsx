import Picture from "./Picture";
import FloatMotion from "./FloatMotion";
import styles from "./Floaters.module.css";

/**
 * Posizioni degli elementi fluttuanti, in percentuale dell'altezza della pagina: a lati
 * alterni, nei margini, così non coprono i testi (e comunque stanno dietro ai contenuti).
 */
const SPOTS = [
  { top: "13%", side: "left", size: 100, rotate: -12 },
  { top: "21%", side: "right", size: 86, rotate: 18 },
  { top: "34%", side: "left", size: 92, rotate: -8 },
  { top: "44%", side: "right", size: 104, rotate: 10 },
  { top: "56%", side: "left", size: 80, rotate: -20 },
  { top: "66%", side: "right", size: 92, rotate: 12 },
  { top: "78%", side: "left", size: 100, rotate: 4 },
  { top: "89%", side: "right", size: 86, rotate: -15 },
] as const;

/**
 * Le illustrazioni di un progetto che danno movimento alla pagina: galleggiano piano ai
 * lati, fanno un piccolo wiggle sul posto e, quando ci passa vicino il cursore, girano e lo
 * seguono per un breve tratto (FloatMotion). Sono solo decorazione: nascoste ai lettori di
 * schermo, non cliccabili, ferme con "riduci animazioni".
 */
export default function Floaters({ keys }: { keys: string[] }) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {keys.slice(0, SPOTS.length).map((key, i) => {
        const spot = SPOTS[i];
        return (
          <div
            key={key}
            className={styles.item}
            style={
              {
                top: spot.top,
                [spot.side]: "var(--edge)",
                "--size": `${spot.size}px`,
                "--rotate": `${spot.rotate}deg`,
                "--delay": `${-i * 1.3}s`,
              } as React.CSSProperties
            }
          >
            {/* Tre strati, perché i movimenti non si annullino a vicenda: il galleggiare
                (.item), l'inseguimento del cursore (.follow), il wiggle (.wiggle) */}
            <div className={styles.follow} data-follow="">
              <div className={styles.wiggle}>
                <Picture name={key} alt="" sizes={`${spot.size}px`} className={styles.img} />
              </div>
            </div>
          </div>
        );
      })}
      <FloatMotion />
    </div>
  );
}
