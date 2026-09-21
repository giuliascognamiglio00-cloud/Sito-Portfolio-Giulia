import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className={`wrap ${styles.foot}`}>© {year} Giulia Scognamiglio</footer>;
}
