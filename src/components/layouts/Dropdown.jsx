import React from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({ title, children }) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{title}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
