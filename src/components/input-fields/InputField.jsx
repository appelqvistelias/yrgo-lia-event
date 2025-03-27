import styles from "./InputField.module.css";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className={styles.label}>
      {label}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
