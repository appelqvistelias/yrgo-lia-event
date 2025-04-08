import styles from "./TextAreaField.module.css";

export default function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  maxLength = 120,
}) {
  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label}>
        {label}
        <div className={styles.textareaFrame}>
          <textarea
            className={styles.textarea}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            maxLength={maxLength}
          />
        </div>
      </label>
    </div>
  );
}
