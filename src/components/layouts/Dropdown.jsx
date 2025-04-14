import React from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({ title, children }) {
  return (
    <details className={styles.dropdown}>
      <summary className={styles.dropdownSummary}>{title}</summary>
      <div className={styles.dropdownContent}>{children}</div>
    </details>
  );
}
