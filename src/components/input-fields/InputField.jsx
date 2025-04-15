import styles from "./InputField.module.css";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  display = "none",
  paragraphText = "",
  required = false,
  className = "",
}) {
  return (
    <div className={styles.div}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}{" "}
        <p className={styles.paragraph} style={{ display: display }}>
          {paragraphText}
        </p>
        <input
          className={`${styles.input} ${className}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
