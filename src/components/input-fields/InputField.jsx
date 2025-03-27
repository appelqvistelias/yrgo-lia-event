import styles from "./inputField.module.css";

export default function InputField({ label, type, placeholder }) {
    return (
      <label className={styles.label}>
        { label }
        <input className={styles.input} type={type} placeholder={placeholder} />
      </label>
    );
  }