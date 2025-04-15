import styles from "./StudentCard.module.css";
import StudentName from "./StudentName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";
import YrgoLogo from "@/icons/yrgologo-big.png";

export default function StudentCard({
  studentName = "Namn saknas",
  education = "Ingen utbildning vald",
  infoText = "Info-text saknas",
  image = YrgoLogo,
  fieldOfInterest = [],
  links = [],
}) {
  // Image handling
  const imageUrl = (() => {
    if (!image) return YrgoLogo.src; // Handle null/undefined
    if (typeof image === "string") return image; // Handle URL strings
    if (image.src) return image.src; // Handle Next.js image objects
    return YrgoLogo.src; // Fallback
  })();

  return (
    <CardBackground>
      <div className={styles.card}>
        <StudentName name={studentName} program={education} />
        <div className={styles.imageContainer}>
          <CardImage imageUrl={imageUrl} altText={`${studentName}'s profile`} />
        </div>
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={education} infoText={infoText} />
          <CardInterests interests={fieldOfInterest} links={links} />
        </div>
      </div>
    </CardBackground>
  );
}
