import { useState } from "react";
import styles from "./ImageUpload.module.css";

export default function ImageUpload({
  label,
  paragraph,
  type = "file",
  accept = "image/*",
  onChange,
}) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Call the parent component's onChange handler if provided
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div className={styles.frame}>
      <label className={styles.label}>
        {label}
        <div
          className={styles.uploadBox}
          style={preview ? { backgroundImage: `url(${preview})` } : {}}
        >
          <input
            className={styles.input}
            type={type}
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      </label>
      <p className={styles.paragraph}>{paragraph}</p>
    </div>
  );
}
