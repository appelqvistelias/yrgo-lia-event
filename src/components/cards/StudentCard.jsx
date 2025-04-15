import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";
import PropTypes from "prop-types";

export default function StudentCard({
  studentName = "Clara S",
  education = "Digital Designer",
  infoText = "Kort text om mig bla bla. Jag gillar söker lia till november etc etc...",
  image = "@/icons/Yrgo-logo.png",
  fieldOfInterest = [],
}) {
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
