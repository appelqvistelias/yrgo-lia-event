import styles from "./ImageUpload.module.css";

export default function ImageUpload({
  label,
  type = "file",
  accept = "image/*",
  onChange,
}) {
  return (
    <div className={styles.frame}>
      <label className={styles.label}>
        {label}
        <input
          className={styles.input}
          type={type}
          accept={accept}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
