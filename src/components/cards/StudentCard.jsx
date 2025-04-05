import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";

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
  // Student & company information - KLART!
  // Student & company interests - in a list
  // Student image
  // Card background

  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name="Clara S" program="digital design" />
        <CardImage
          imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          altText="Student image"
        />
        <CardInfo
          heading="Digital Designer"
          infoText="Driven designer med passion för typografi och varumärkesbyggande."
        />
        {/* Lägg till fler komponenter här */}
      </div>
    </CardBackground>
  );
}
