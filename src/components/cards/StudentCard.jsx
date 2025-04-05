import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";

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
        <div>
          <StudentName /*Change to correct input! */
            name="John Doe"
            program="Webbutveckling"
          />
          <CardInfo
            heading="Webbutvecklare"
            infoText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      }
    </div>
  );
}
