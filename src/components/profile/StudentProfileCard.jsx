import styles from "./StudentProfileCard.module.css";
import LayoutCard from "../layouts/LayoutCard";
import CardImage from "../cards/CardImage";
import StudentName from "../cards/StudentName";
import CardInfo from "../cards/CardInfo";
import CardInterests from "../cards/CardInterests";

export default function StudentProfileCard({
  studentName,
  education,
  infoText,
  image,
  fieldOfInterest,
}) {
  if (education === "webbutveckling") {
    education = "Webbutvecklare";
  }
  if (education === "digital_design") {
    education = "Digital Designer";
  }

  return (
    <LayoutCard>
      <div className={styles.card}>
        <div className={styles.secondColumn}>
          <div className={styles.studentName}>
            <h1 className={styles.studentNameText}>{studentName}</h1>
          </div>
        </div>
        <div className={styles.firstColumn}>
          <CardImage imageUrl={image} altText={`${studentName}'s profile`} />
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.fullInfo}>
            <div className={styles.info}>
              <h2 className={styles.education}>{education}</h2>
              <p className={styles.infoText}>{infoText}</p>
            </div>
            <CardInterests interests={fieldOfInterest} />
          </div>
        </div>
      </div>
    </LayoutCard>
  );
}
