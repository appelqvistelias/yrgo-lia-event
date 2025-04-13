import styles from "./LayoutParagraph.module.css";

export default function LayoutParagraph({ paragraphText }) {
  return (
    <div className={styles.paragraphContainer}>
      <p className={styles.paragraphText}>{paragraphText}</p>
    </div>
  );
}
