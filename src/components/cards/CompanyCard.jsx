import styles from "./CompanyCard.module.css";
import CompanyName from "./CompanyName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";

export default function CompanyCard({
  companyName = "Företag",
  liaInfo = "2 LIA-platser",
  infoText = "Kort text om företaget bla bla. Vi är ett företag som...",
  image = "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJyYW5kc3xlbnwwfHwwfHx8MA%3D%3D",
  specialization = ["UI", "UX", "3D"],
}) {
  return (
    <CardBackground>
      <div className={styles.card}>
        <CompanyName name={companyName} />
        <CardImage imageUrl={image} altText={`${companyName}'s profile`} />
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={liaInfo} infoText={infoText} />
          <CardInterests interests={specialization} />
        </div>
      </div>
    </CardBackground>
  );
}
