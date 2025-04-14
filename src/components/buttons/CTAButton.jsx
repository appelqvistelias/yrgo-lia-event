import styles from "./CTAButton.module.css";

const CTAButton = ({ children }) => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button className={styles.button} onClick={scrollToBottom}>
      {children}
    </button>
  );
};

export default CTAButton;
