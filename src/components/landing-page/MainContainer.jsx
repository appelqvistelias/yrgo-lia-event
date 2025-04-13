import styles from "./MainContainer.module.css";

export default function MainContainer({ children }) {
  return <div className={styles.mainContainer}>{children}</div>;
}
