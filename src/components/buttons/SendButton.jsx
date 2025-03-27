import { useState } from "react";
import styles from "./sendButton.module.css";

// Used to submit forms
// Must be placed inside a form
// Has loading state to prevent user from clicking multiple times
// Customizable label with "Skicka" as fallback

const sendButton = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="submit"
      className={styles.sendButton}
      disabled={isLoading}
      onClick={() => setIsLoading(true)}
    >
      {isLoading ? "Skickar..." : children || "Skicka"}
    </button>
  );
};

export default sendButton;