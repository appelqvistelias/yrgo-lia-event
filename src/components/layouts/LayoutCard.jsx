import styles from "./LayoutCard.module.css";

export default function LayoutCard({ children }) {
  return (
    <div className={styles.cardBackgroundContainer}>
      <div className={styles.cardBackground}>
        <div className={styles.cardFiller}>{children}</div>
      </div>
    </div>
  );
}
