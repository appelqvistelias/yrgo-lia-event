import styles from "./Divider.module.css";

const Divider = ({
  margin,
  borderTop = "1px solid var(--Greyscale-grey1, #121212)",
}) => {
  return <div className={styles.divider} style={{ margin, borderTop }} />;
};

export default Divider;
