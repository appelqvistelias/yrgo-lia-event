import styles from "./CardInterests.module.css";
import SocialLink from "../links/SocialLink";

export default function CardInterests({ interests = [], links = [], isProfile = false }) {
  return (
    <div className={`${styles.cardInterestsContainer} ${isProfile ? styles.profileView : ''}`}>
      <ul className={styles.cardInterests}>
        {interests.map((interest, index) => (
          <li 
            key={index} 
            className={`${styles.cardInterestText} ${isProfile ? styles.profileText : ''} title_6`}
          >
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
