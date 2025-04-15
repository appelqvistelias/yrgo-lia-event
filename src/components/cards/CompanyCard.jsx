import styles from "./CompanyCard.module.css";
import CompanyName from "./CompanyName";
import CardInfo from "./CardInfo";
import CardBackground from "./CardBackground";
import CardImage from "./CardImage";
import CardInterests from "./CardInterests";
import YrgoLogo from "@/icons/yrgologo-big.png";

export default function CompanyCard({
  companyName = "Företag",
  liaInfo = "Information saknas",
  infoText = "Information saknas",
  image = YrgoLogo,
  specialization = [],
  mail = "",
}) {
  // Image handling
  const imageUrl = (() => {
    if (!image) return YrgoLogo.src;
    if (typeof image === "string") return image;
    if (image.src) return image.src;
    return YrgoLogo.src;
  })();

  // Create mailto link for email
  const emailLink = mail ? `mailto:${mail}` : "";

  return (
    <CardBackground>
      <div className={styles.card}>
        <CompanyName name={companyName} />
        <CardImage imageUrl={imageUrl} altText={`${companyName}'s profile`} />
        <div className={styles.lowerHalfContent}>
          <CardInfo heading={liaInfo} infoText={infoText} />
          <CardInterests
            interests={specialization}
            links={[emailLink].filter(Boolean)}
          />
        </div>
      </div>
    </CardBackground>
  );
}
