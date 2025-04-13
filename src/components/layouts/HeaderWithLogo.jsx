import YrgoLogoSmall from "../../icons/yrgologo.svg";
import YrgoLogoBig from "../../icons/yrgologobig.svg";
import styles from "./HeaderWithLogo.module.css";

export default function HeaderWithLogo({ children }) {
  return (
    <div className={styles.headlineContainer}>
      <h1 className={styles.headline}>{children}</h1>
      <YrgoLogoSmall className={styles.smallLogo} />
      <YrgoLogoBig className={styles.bigLogo} />
    </div>
  );
}
