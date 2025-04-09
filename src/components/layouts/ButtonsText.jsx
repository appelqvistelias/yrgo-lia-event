import styles from "./ButtonsText.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ButtonsText({ text, buttonText, buttonLink }) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);
    router.push(buttonLink);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>{text}</h2>
    </div>
  );
}
