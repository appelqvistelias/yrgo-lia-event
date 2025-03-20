import { useState } from "react";
import styles from "./ToggleButton.module.css";

const ChoiceButton = ({ label, name, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(value); // Sends the value to the parent component
  };

  return (
    <label className={`${styles.button} ${isChecked ? styles.selected : ""}`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        hidden
      />
      {label}
    </label>
  );
};

export default ChoiceButton;
