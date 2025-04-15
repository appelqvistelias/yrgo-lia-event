import { useState } from "react";
import styles from "./ChoiceButton.module.css";

const ChoiceButton = ({ label, name, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
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
