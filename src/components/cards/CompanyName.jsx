import styles from "./CompanyName.module.css";

export default function CompanyName({ name }) {
  return (
    <div className={styles.companyNameContainer}>
      <h2 className={styles.companyName}>{name}</h2>
    </div>
  );
}
