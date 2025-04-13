import styles from "./ButtonsText.module.css";
import RedirectButton from "@/components/buttons/RedirectButton";

export default function ButtonsText({
  text,
  leftButtonText,
  leftButtonLink,
  rightButtonText,
  rightButtonLink,
}) {
  return (
    <div className={styles.container}>
      <h4 className={styles.text}>{text}</h4>
      <div className={styles.buttonsContainer}>
        <RedirectButton href={leftButtonLink}>{leftButtonText}</RedirectButton>
        <RedirectButton href={rightButtonLink}>
          {rightButtonText}
        </RedirectButton>
      </div>
    </div>
  );
}
