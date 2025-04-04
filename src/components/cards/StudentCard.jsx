import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";

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
    <div className="style.card">
      {
        <StudentName /*Change to correct input! */
          name="John Doe"
          program="Digital Design"
        />
      }
    </div>
  );
}
