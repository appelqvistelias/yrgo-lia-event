import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";

export default function StudentCard({
  studentName,
  education,
  infoText,
  image,
  fieldOfInterest = [],
}) {
  // Parts of the card:
  // Icon
  // Student name - KLART!
  // Student & company information - maybe in heading a paragraph?
  // Student & company interests - in a list
  // Student image
  // Card background

  return (
    <div className={styles.card}>
      <CardBackground>
        <StudentName
          name={studentName || "Clara S"}
          program={education || "Digital Designer"}
        />
        <CardInfo
          heading={education || "Digital Design"}
          infoText={infoText || "Kort text om mig bla bla..."}
        />
      </CardBackground>
    </div>
  );
}
