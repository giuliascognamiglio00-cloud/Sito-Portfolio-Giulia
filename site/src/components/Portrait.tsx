import Picture from "./Picture";
import styles from "./Portrait.module.css";

type Props = {
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Il ritratto in "Chi sono": PNG ritagliato a sfondo trasparente, senza riquadro,
 * come in home.
 */
export default function Portrait({ alt, sizes, priority, className }: Props) {
  return (
    <div className={`${styles.portrait} ${className ?? ""}`}>
      <Picture name="portrait" alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}
