"use client";

/**
 * StudentForm Component
 * Handles both student registration and profile editing functionality.
 *
 */

import { useState, useEffect } from "react";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";
import HeaderWithLogo from "../layouts/HeaderWithLogo";
import PolicyCheckbox from "./PolicyCheckbox";
import TextAreaField from "../input-fields/TextareaField";
import ImageUpload from "../input-fields/ImageUpload";
import styles from "./StudentForm.module.css";

export default function StudentForm({
  initialValues,
  headerTitle,
  onSubmit,
  isEdit = false,
}) {
  // --- Form State Management ---
  // Basic Information
  const [name, setName] = useState(initialValues.name || "");
  const [studentSpecialization, setStudentSpecialization] = useState(
    initialValues.studentSpecialization || ""
  );
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState(initialValues.password || "");

  // Profile Details
  const [selectedFile, setSelectedFile] = useState(
    initialValues.selectedFile || null
  );
  const [studentBio, setStudentBio] = useState(initialValues.studentBio || "");
  const [linkedIn, setLinkedIn] = useState(initialValues.linkedIn || "");
  const [portfolio, setPortfolio] = useState(initialValues.portfolio || "");

  // Form Control States
  const [acceptedTerms, setAcceptedTerms] = useState(
    initialValues.acceptedTerms || false
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Areas of Interest/Specialization
  const [fieldOfInterest, setFieldOfInterest] = useState(
    initialValues.fieldOfInterest || {
      ui: false,
      ux: false,
      three_d: false,
      branding: false,
      motion: false,
      frontend: false,
      backend: false,
      fullstack: false,
    }
  );

  // --- State Synchronization ---
  // Update local state when initial values change (important for edit mode)
  useEffect(() => {
    setName(initialValues.name || "");
    setStudentSpecialization(initialValues.studentSpecialization || "");
    setEmail(initialValues.email || "");
    setPassword(initialValues.password || "");
    setSelectedFile(initialValues.selectedFile || null);
    setStudentBio(initialValues.studentBio || "");
    setLinkedIn(initialValues.linkedIn || "");
    setPortfolio(initialValues.portfolio || "");
    setAcceptedTerms(initialValues.acceptedTerms || false);
    setFieldOfInterest(
      initialValues.fieldOfInterest || {
        ui: false,
        ux: false,
        three_d: false,
        branding: false,
        motion: false,
        frontend: false,
        backend: false,
        fullstack: false,
      }
    );
  }, [initialValues]);

  // --- Form Validation ---
  // Validates email format using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // --- Form Submission Handler ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    // Different validation rules apply for registration vs editing
    if (!name || (!isEdit && (!email || !acceptedTerms))) {
      setErrorMessage("Please fill in all fields and accept the terms.");
      return;
    }
    if (!isEdit && password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    } else if (
      isEdit &&
      password &&
      password.length > 0 &&
      password.length < 6
    ) {
      setErrorMessage(
        "Password must be at least 6 characters long if you want to update it."
      );
      return;
    }
    if (!isEdit && !validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!studentSpecialization) {
      setErrorMessage("Please select a specialization.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    // Prepare and submit form data
    const formData = {
      name,
      studentSpecialization,
      email,
      password,
      selectedFile,
      studentBio,
      linkedIn,
      portfolio,
      fieldOfInterest,
    };

    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <section id="student-signup-form" className={styles["signup-form-section"]}>
      <div className={styles["inner-wrapper"]}>
        <HeaderWithLogo>{headerTitle}</HeaderWithLogo>
        <form onSubmit={handleFormSubmit}>
          {/* Form Fields Container */}
          <div className={styles["input-fields"]}>
            {/* Error Message Display */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Basic Information Section */}
            <InputField
              label="FULLSTÄNDIGT NAMN"
              type="text"
              placeholder="Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Program Selection Section */}
            <div>
              <p className={styles["separate-label"]}>PROGRAM</p>
              <fieldset className={styles["fieldset-choices"]}>
                <ChoiceButton
                  label="DD"
                  value={studentSpecialization === "digital_design"}
                  onChange={(checked) =>
                    checked ? setStudentSpecialization("digital_design") : null
                  }
                />
                <ChoiceButton
                  label="WU"
                  value={studentSpecialization === "webbutveckling"}
                  onChange={(checked) =>
                    checked ? setStudentSpecialization("webbutveckling") : null
                  }
                />
              </fieldset>
            </div>

            {/* Authentication Fields */}
            <InputField
              label="MAIL"
              type="email"
              placeholder="dittnamn@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="LÖSENORD"
              type="password"
              placeholder={
                isEdit
                  ? "Lämna tomt om du inte vill ändra lösenord"
                  : "Välj ett säkert lösenord"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Areas of Interest Section */}
            <div>
              <p className={styles["separate-label"]}>INOM VILKET OMRÅDE?</p>
              <p className={styles["specialization-note"]}>
                (You can select multiple)
              </p>
              <fieldset className={styles["fieldset-choices"]}>
                <ChoiceButton
                  label="UI"
                  value={fieldOfInterest.ui}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({ ...prev, ui: checked }))
                  }
                />
                <ChoiceButton
                  label="UX"
                  value={fieldOfInterest.ux}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({ ...prev, ux: checked }))
                  }
                />
                <ChoiceButton
                  label="3D"
                  value={fieldOfInterest.three_d}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      three_d: checked,
                    }))
                  }
                />
                <ChoiceButton
                  label="Branding"
                  value={fieldOfInterest.branding}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      branding: checked,
                    }))
                  }
                />
                <ChoiceButton
                  label="Motion"
                  value={fieldOfInterest.motion}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      motion: checked,
                    }))
                  }
                />
                <ChoiceButton
                  label="Frontend"
                  value={fieldOfInterest.frontend}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      frontend: checked,
                    }))
                  }
                />
                <ChoiceButton
                  label="Backend"
                  value={fieldOfInterest.backend}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      backend: checked,
                    }))
                  }
                />
                <ChoiceButton
                  label="Fullstack"
                  value={fieldOfInterest.fullstack}
                  onChange={(checked) =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      fullstack: checked,
                    }))
                  }
                />
              </fieldset>
            </div>

            {/* Profile Information Section */}
            <div className={styles["pitch-portfolio-img"]}>
              <div className={styles["pitch-portfolio"]}>
                <TextAreaField
                  label="HISSPITCH OM DIG"
                  placeholder="Jag studerar..."
                  value={studentBio}
                  display="block"
                  paragraphText="(Visas i studentprofil för företag)"
                  onChange={(e) => setStudentBio(e.target.value)}
                />
                <div className={styles["portfolio-mobile"]}>
                  <TextAreaField
                    label="PORTFOLIO/LINKEDIN"
                    placeholder="Länk till Portfolio/Github"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                  <TextAreaField
                    placeholder="Länk till LinkedIn"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </div>
                <div className={styles["portfolio-desktop"]}>
                  <InputField
                    label="PORTFOLIO/LINKEDIN"
                    type="text"
                    placeholder="Länk till Portfolio/Github"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                  <InputField
                    type="text"
                    placeholder="Länk till LinkedIn"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </div>
              </div>
              <ImageUpload
                label="ADDERA BILD"
                paragraph="(Visas i studentprofil för företag)"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>

            {/* Terms and Conditions (only shown during registration) */}
            {!isEdit && (
              <PolicyCheckbox
                accept={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
            )}

            {/* Submit Button */}
            <SendButton disabled={loading}>Skicka</SendButton>
          </div>
        </form>
      </div>
    </section>
  );
}
