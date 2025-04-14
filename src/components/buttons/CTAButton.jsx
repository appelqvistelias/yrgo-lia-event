import styles from "./CTAButton.module.css";

const CTAButton = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default CTAButton;
