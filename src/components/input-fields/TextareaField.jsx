import styles from "./TextAreaField.module.css";

export default function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
}) {
  return (
    <div className={styles.div}>
      <label className={styles.label}>
        {label}
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      </label>
    </div>
  );
}
