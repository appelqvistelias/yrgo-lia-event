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
            name="Clara S"
            program="Digital Designer"
          />
          <CardInfo
            heading="Digital Design"
            infoText="Kort text om mig bla bla. Jag gillar söker lia till november etc etc Kort text om mig bla bla. Jag gillar söker lia till november etc etc Kort text om mig bla bla. Jag gillar söker lia till november etc etc Kort text om mig bla bla. Jag gillar söker lia till november etc etc"
          />
        </div>
      }
    </div>
  );
}
