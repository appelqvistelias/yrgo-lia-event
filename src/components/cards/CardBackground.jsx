import styles from "./CardBackground.module.css";
// CardBackground component
// This component is used to display the background of the card
export default function CardBackground({ children }) {
  return (
    <div className={styles.cardBackgroundContainer}>
      <div className={styles.cardBackground}>{children}</div>
    </div>
  );
}
