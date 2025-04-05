import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";

export default function StudentCard(
  {
    // studentName,
    // education,
    // infoText,
    // image,
    // fieldOfInterest = [],
  }
) {
  // Parts of the card:
  // Icon
  // Student name - KLART!
  // Student & company information - maybe in heading a paragraph?
  // Student & company interests - in a list
  // Student image
  // Card background

  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name="Clara S" program="digital design" />
        <CardInfo
          heading="Digital Designer"
          infoText="Driven designer med passion för typografi och varumärkesbyggande."
        />
        {/* Lägg till fler komponenter här */}
      </div>
    </CardBackground>
  );
}
