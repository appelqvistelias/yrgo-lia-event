import styles from "./ButtonsText.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RedirectButton from "@/components/buttons/RedirectButton";

export default function ButtonsText({
  text,
  leftButtonText,
  leftButtonLink,
  rightButtonText,
  rightButtonLink,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = (link) => {
    setIsClicked(true);
    router.push(link);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>{text}</h2>
      <div className={styles.buttonsContainer}>
        <RedirectButton href={leftButtonLink}>{leftButtonText}</RedirectButton>
        <RedirectButton href={rightButtonLink}>
          {rightButtonText}
        </RedirectButton>
      </div>
    </div>
  );
}
