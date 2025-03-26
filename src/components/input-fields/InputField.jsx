import styles from "./InputField.module.css";

export default function InputField({ label, type, placeholder }) {
    return (
      <label className={styles.label}>
        { label }
        <input className={styles.input} type={type} placeholder={placeholder} />
      </label>
    );
  }