import YrgoLogo from "../../icons/yrgologo.svg";
import styles from "./HeaderWithLogo.module.css";

export default function HeaderWithLogo({ children }) {
  return (
    <div className={styles.headlineContainer}>
      <h1 className={styles.headline}>{children}</h1>
      <YrgoLogo />
    </div>
  );
}
