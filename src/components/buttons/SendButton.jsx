import { useState } from "react";
import styles from ".Sendbutton.module.css";
//Need styling for the button

// The SendButton component is a button that is used to submit a form.
// It has a default text of "Skicka" but can be overridden with a custom text.
// It is styled with the styles.button class.
const SendButton = ({ children }) => {
  return (
    <button type="submit" className={styles.Sendbutton}>
      {children || "Skicka"}
    </button>
  );
};
