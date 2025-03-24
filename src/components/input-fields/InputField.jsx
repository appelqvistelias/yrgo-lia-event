import styles from "./InputField.module.css";

export default function InputField({ type, placeholder }) {
    return <input className={styles.input} type={type} placeholder={placeholder} />;
  }