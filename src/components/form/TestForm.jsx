"use client";

import { useState } from "react";
import ChoiceButton from "../buttons/choiceButton";
import styles from "./testForm.module.css";
import InputField from "../input-fields/inputField";

const TestForm = () => {
  const [selectedChoices, setSelectedChoices] = useState([]);

  const handleChoiceChange = (value) => {
    setSelectedChoices(
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((item) => item !== value) // Ta bort om redan vald
          : [...prevSelected, value] // Lägg till annars
    );
  };

  return (
    <div className={styles.formContainer}>
      <h2>Testa Choice Buttons</h2>
      <div className={styles.buttonGroup}>
        <ChoiceButton label="UI" value="UI" onChange={handleChoiceChange} />
        <ChoiceButton label="UX" value="UX" onChange={handleChoiceChange} />
        <ChoiceButton label="3D" value="3D" onChange={handleChoiceChange} />
        <ChoiceButton
          label="Branding"
          value="Branding"
          onChange={handleChoiceChange}
        />
        <ChoiceButton
          label="Motion"
          value="Motion"
          onChange={handleChoiceChange}
        />
        <ChoiceButton
          label="Webbutveckling"
          value="Webbutveckling"
          onChange={handleChoiceChange}
        />
        <InputField placeholder="Namn" />
      </div>

      {/* Visa valen för att se att det fungerar */}
      <p className={styles.resultText}>
        Valda områden: {selectedChoices.join(", ")}
      </p>
    </div>
  );
};

export default TestForm;
