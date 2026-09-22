import Picture from "./Picture";
import styles from "./Portrait.module.css";

type Props = {
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Il box del ritratto, uguale in home e in "Chi sono": angoli arrotondati, fondo `--wash`
 * e la foto ritagliata (PNG trasparente) appoggiata sul fondo.
 */
export default function Portrait({ alt, sizes, priority, className }: Props) {
  return (
    <div className={`${styles.portrait} ${className ?? ""}`}>
      <Picture name="portrait" alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}
