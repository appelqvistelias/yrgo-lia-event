import styles from "./StudentCard.module.css";
import React from "react";

export default function StudentCard({
  studentName,
  education,
  infoText,
  image,
  fieldOfInterest = [],
}) {
  return (
    <div className="styles.card">
      <div className="styles.background"></div>
    </div>
  );
}
