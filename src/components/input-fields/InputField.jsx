import styles from "./InputField.module.css";

export default function InputField({ placeholder, type = "text" }) {
    return <input className={styles.input} type={type} placeholder={placeholder} />;
  }