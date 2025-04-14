import styles from "./Divider.module.css";

const Divider = ({ margin, borderColor }) => {
  return (
    <div
      className={styles.divider}
      style={{
        ...(margin && { margin }),
        ...(borderColor && { borderTopColor: borderColor }),
      }}
    />
  );
};

export default Divider;
