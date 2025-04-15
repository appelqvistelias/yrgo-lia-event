import styles from "./CardInterests.module.css";
import SocialLink from "../links/SocialLink";

export default function CardInterests({ interests = [], links = [] }) {
  return (
    <div className={styles.cardInterestsContainer}>
      <ul className={styles.cardInterests}>
        {interests.map((interest, index) => (
          <li key={index} className={`${styles.cardInterestText} title_6`}>
            {interest}
          </li>
        ))}
      </ul>
      <div className={styles.iconContainer}>
        {Array.isArray(links) ? (
          links.map((link, index) => <SocialLink key={index} url={link} />)
        ) : (
          <SocialLink url={links} />
        )}
      </div>
    </div>
  );
}
