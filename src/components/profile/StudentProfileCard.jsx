import styles from "./StudentProfileCard.module.css";
import LayoutCard from "../layouts/LayoutCard";
import CardImage from "../cards/CardImage";
import StudentName from "../cards/StudentName";
import CardInfo from "../cards/CardInfo";
import CardInterests from "../cards/CardInterests";

export default function StudentProfileCard({
  studentName = "Clara S",
  education = "Digital Designer",
  infoText = "Kort text om mig bla bla. Jag gillar söker lia till november etc etc...",
  image = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  fieldOfInterest = ["UI", "Branding", "3D"],
}) {
  return (
    <LayoutCard>
      <div className={styles.card}>
        <div className={styles.secondColumn}>
          <div className={styles.studentName}>
            <h1>{studentName}</h1>
            {/* Add program abbreviation here */}
          </div>
        </div>
        <div className={styles.firstColumn}>
          <CardImage imageUrl={image} altText={`${studentName}'s profile`} />
        </div>
        <div className={styles.secondColumn}>
          <h2 className={styles.education}>{education}</h2>
          <p className={styles.infoText}>{infoText}</p>
          <ul></ul>
          <CardInterests interests={fieldOfInterest} />
        </div>
      </div>
    </LayoutCard>
  );
}
