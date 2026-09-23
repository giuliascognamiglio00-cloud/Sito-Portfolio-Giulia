import styles from "./Approach.module.css";

type Props = {
  heading: string;
  lede: string;
  steps: { title: string; text: string }[];
};

export default function Approach({ heading, lede, steps }: Props) {
  return (
    <section className={styles.approach} aria-labelledby="approach">
      <div className={styles.aside}>
        <h2 id="approach" className="display">
          {heading}
        </h2>
        <p className={styles.lede}>{lede}</p>
      </div>

      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
