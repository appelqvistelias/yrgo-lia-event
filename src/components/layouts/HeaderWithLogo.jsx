import YrgoLogo from "../../icons/yrgologo.svg";
import styles from "./HeaderWithLogo.module.css";

export default function HeaderWithLogo({ children }) {
  console.log(YrgoLogo);
  return (
    <div className={styles.headlineContainer}>
      <h1 className={styles.headline}>{children}</h1>
      <YrgoLogo />
    </div>
  );
}
