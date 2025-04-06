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
  image = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  fieldOfInterest = ["UI", "Branding", "3D"],
}) {
  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name={studentName} program={education} />
        <CardImage imageUrl={image} altText={`${studentName}'s profile`} />
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={education} infoText={infoText} />
          <CardInterests interests={fieldOfInterest} />
        </div>
      </div>
    </CardBackground>
  );
}
