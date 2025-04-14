import styles from "./Divider.module.css";

const Divider = ({ margin }) => {
  return <div className={styles.divider} style={{ margin }} />;
};

export default Divider;
