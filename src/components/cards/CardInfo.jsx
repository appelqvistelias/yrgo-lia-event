import styles from "./CardInfo.module.css";

// CardInfo component
// This component is used to display information about the student and company
export default function CardInfo({ heading, infoText }) {
  return (
    <div className={styles.cardInfoContainer}>
      <h2 className={`${styles.heading} title_5`}>{heading}</h2>
      <p className={styles.infoText}>{infoText}</p>
    </div>
  );
}
