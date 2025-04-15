"use client";
import { useState } from "react";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";
import HeaderWithLogo from "../layouts/HeaderWithLogo";
import PolicyCheckbox from "./PolicyCheckbox";
import TextAreaField from "../input-fields/TextareaField";
import ImageUpload from "../input-fields/ImageUpload";
import styles from "./StudentSignUpForm.module.css";

export default function StudentForm({ initialValues, headerTitle, onSubmit }) {
  const [name, setName] = useState(initialValues.name || "");
  const [studentSpecialization, setStudentSpecialization] = useState(
    initialValues.studentSpecialization || ""
  );
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState(initialValues.password || "");
  const [selectedFile, setSelectedFile] = useState(
    initialValues.selectedFile || null
  );
  const [studentBio, setStudentBio] = useState(initialValues.studentBio || "");
  const [linkedIn, setLinkedIn] = useState(initialValues.linkedIn || "");
  const [portfolio, setPortfolio] = useState(initialValues.portfolio || "");
  const [acceptedTerms, setAcceptedTerms] = useState(
    initialValues.acceptedTerms || false
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Enkel validering
    if (!name || !email || !acceptedTerms) {
      setErrorMessage("Vänligen fyll i alla fält och acceptera villkoren.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Lösenordet måste vara minst 6 tecken långt.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Vänligen ange en giltig e-postadress.");
      return;
    }
    if (!studentSpecialization) {
      setErrorMessage("Vänligen välj en specialisering.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    // Samla in data och skicka till onSubmit‑funktionen
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
          <div className={styles["input-fields"]}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <InputField
              label="FULLSTÄNDIGT NAMN"
              type="text"
              placeholder="Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div>
              <p className={styles["separate-label"]}>PROGRAM</p>
              <fieldset className={styles["fieldset-choices"]}>
                <ChoiceButton
                  label="DD"
                  value="digital_design"
                  onChange={() => setStudentSpecialization("digital_design")}
                />
                <ChoiceButton
                  label="WU"
                  value="webbutveckling"
                  onChange={() => setStudentSpecialization("webbutveckling")}
                />
              </fieldset>
            </div>

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
              placeholder="Välj ett starkt lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <p className={styles["separate-label"]}>INOM VILKET OMRÅDE?</p>
              <p className={styles["specialization-note"]}>
                (Du kan välja flera)
              </p>
              <fieldset className={styles["fieldset-choices"]}>
                <ChoiceButton
                  label="UI"
                  value={fieldOfInterest.ui}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({ ...prev, ui: !prev.ui }))
                  }
                />
                <ChoiceButton
                  label="UX"
                  value={fieldOfInterest.ux}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({ ...prev, ux: !prev.ux }))
                  }
                />
                <ChoiceButton
                  label="3D"
                  value={fieldOfInterest.three_d}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      three_d: !prev.three_d,
                    }))
                  }
                />
                <ChoiceButton
                  label="Branding"
                  value={fieldOfInterest.branding}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      branding: !prev.branding,
                    }))
                  }
                />
                <ChoiceButton
                  label="Motion"
                  value={fieldOfInterest.motion}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      motion: !prev.motion,
                    }))
                  }
                />
                <ChoiceButton
                  label="Frontend"
                  value={fieldOfInterest.frontend}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      frontend: !prev.frontend,
                    }))
                  }
                />
                <ChoiceButton
                  label="Backend"
                  value={fieldOfInterest.backend}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      backend: !prev.backend,
                    }))
                  }
                />
                <ChoiceButton
                  label="Fullstack"
                  value={fieldOfInterest.fullstack}
                  onChange={() =>
                    setFieldOfInterest((prev) => ({
                      ...prev,
                      fullstack: !prev.fullstack,
                    }))
                  }
                />
              </fieldset>
            </div>

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
                    placeholder="Länk till portfolio/Github"
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
                    placeholder="Länk till portfolio/Github"
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
            <PolicyCheckbox
              accept={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <SendButton disabled={loading}>Skicka</SendButton>
          </div>
        </form>
      </div>
    </section>
  );
}
