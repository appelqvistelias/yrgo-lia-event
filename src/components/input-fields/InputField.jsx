import styles from "./InputField.module.css";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className={styles.div}>
      <label className={styles.label}>
        { label }
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
