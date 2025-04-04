import styles from "./CardInfo.module.css";

export default function CardInfo({ heading, infoText }) {
  return (
    <div className={styles.cardInfoContainer}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.cardInfo}>{infoText}</p>
    </div>
  );
}
