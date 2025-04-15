import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";
import YrgoLogo from "@/icons/yrgologo-big.png"; // Adjust the path as necessary

export default function StudentCard({
  studentName = "Namn saknas",
  education = "Ingen utbildning vald",
  infoText = "Info-text saknas",
  image = YrgoLogo, // Default image for the card
  fieldOfInterest = [],
}) {
  console.log("Image value:", image);

  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name={studentName} program={education} />
        <div className={styles.imageContainer}>
          <CardImage imageUrl={image} altText={`${studentName}'s profile`} />
        </div>
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={education} infoText={infoText} />
          <CardInterests interests={fieldOfInterest} />
        </div>
      </div>
    </CardBackground>
  );
}
