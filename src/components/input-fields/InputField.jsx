import styles from "./InputField.module.css";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  display = "none",
  paragraphText = "",
}) {
  return (
    <div className={styles.div}>
      <label className={styles.label}>
        {label}
        <p className={styles.paragraph} style={{ display: display }}>
          {paragraphText}
        </p>
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

// Add exclamation mark when invalid
