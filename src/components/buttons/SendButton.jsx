import { useState } from "react";
import styles from "./SendButton.module.css";

// Used to submit forms
// Must be placed inside a form
// Has loading state to prevent user from clicking multiple times
// Customizable label with "Skicka" as fallback

const SendButton = ({ children, onClick, disabled }) => {
  return (
    <button
      type="submit"
      className={styles.sendButton}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Skickar..." : children || "Skicka"}
    </button>
  );
};

export default SendButton;
