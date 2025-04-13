import styles from "./Section.module.css";

export default function Section({ children }) {
  return (
    <section className={styles.section}>
      <div className={styles.innerWrapper}>{children}</div>
    </section>
  );
}
