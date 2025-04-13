import styles from "./CardImage.module.css";
// CardImage component
// This component is used to display the image of the student or company

export default function CardImage({ imageUrl, altText }) {
  return <img src={imageUrl} alt="Profilbild" className={styles.cardImage} />;
}
