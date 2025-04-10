import YrgoLogo from "../../icons/yrgologo.svg";
import styles from "./HeaderWithLogoAndBorder.module.css";

export default function HeaderWithLogoAndBorder({ children }) {
  return (
    <div className={styles.withBorder}>
      <div className={styles.headlineContainer}>
        <h1 className={styles.headline}>{children}</h1>
        <YrgoLogo />
      </div>
    </div>
  );
}
