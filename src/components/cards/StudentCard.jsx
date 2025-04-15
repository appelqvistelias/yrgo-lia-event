import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";

export default function StudentCard({
  studentName = "Namn saknas",
  education = "Ingen utbildning vald",
  infoText = "Info-text saknas",
  image = null,
  fieldOfInterest = [],
}) {
  // Use nullish coalescing to handle the default image
  const displayImage = image || defaultLogo;
  console.log("Image value:", displayImage);

  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name={studentName} program={education} />
        <div className={styles.imageContainer}>
          <CardImage
            imageUrl={displayImage}
            altText={`${studentName}'s profile`}
          />
        </div>
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={education} infoText={infoText} />
          <CardInterests interests={fieldOfInterest} />
        </div>
      </div>
    </CardBackground>
  );
}
