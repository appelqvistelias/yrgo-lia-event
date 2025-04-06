import styles from "./CardInterests.module.css";
// CardInterests component
// This component is used to display the interests of the student
// It takes an array of interests, an icon and a link (to gitub/portfolio/mail) as props

export default function CardInterests({ interests, link, icon }) {
  return (
    <div className={styles.cardInterestsContainer}>
      <ul className={styles.cardInterests}>
        {interests.map((interest, index) => (
          <li key={index} className={`${styles.cardInterestText} title_6`}>
            {interest}
          </li>
        ))}
      </ul>
      <div className={styles.iconContainer}>X</div> {/* Add icon here */}
    </div>
  );
}
