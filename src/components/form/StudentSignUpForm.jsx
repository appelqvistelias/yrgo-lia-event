"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import styles from "./StudentSignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";
import HeaderWithLogo from "../layouts/HeaderWithLogo";
import PolicyCheckbox from "./PolicyCheckbox";
import TextAreaField from "../input-fields/TextAreaField";
import ImageUpload from "../input-fields/ImageUpload";

// Function to validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function StudentSignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [studentSpecialization, setStudentSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentBio, setStudentBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldOfInterest, setFieldOfInterest] = useState({
    ui: false,
    ux: false,
    three_d: false,
    branding: false,
    motion: false,
    frontend: false,
    backend: false,
    fullstack: false,
  });

  const handleSubmit = async () => {
    // Basic validation
    if (!name || !email || !acceptedTerms) {
      setErrorMessage(
        "Vänligen fyll i alla fält och acceptera villkoren för att kunna skicka in anmälan."
      );
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

    setLoading(true);
    setErrorMessage("");

    try {
      // Register user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error(
          "Registrering i Supabase Auth misslyckades:",
          authError.message
        );
        throw new Error(
          "Kunde inte registrera konto. Kontrollera din e-post och försök igen."
        );
      }

      if (!authData?.user) {
        throw new Error("Registreringen misslyckades, försök igen.");
      }

      const userId = authData.user.id;

      // Upload profile picture to Supabase Storage
      let imageUrl;

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("user-images")
          .upload(filePath, selectedFile);

        if (uploadError) {
          throw new Error("Kunde inte ladda upp bild: " + uploadError.message);
        }

        // Create public URL to the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("user-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData?.publicUrl;
      }

      // Insert user into the users table
      const { error: userError } = await supabase
        .from("users")
        .insert([{ id: userId, email, role: 1 }]); // 1 = student

      if (userError) {
        console.error("User error:", userError);
        throw userError;
      }

      // Connecting image URL to the user
      const { error: imageInsertError } = await supabase.from("images").insert([
        {
          user_id: userId,
          url: imageUrl,
        },
      ]);

      if (imageInsertError) {
        throw new Error(
          "Kunde inte spara bild i databasen: " + imageInsertError.message
        );
      }

      // Insert student i students table and get ID
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .insert([
          {
            user_id: userId,
            full_name: name,
            bio: studentBio,
            linkedin: linkedIn,
            portfolio: portfolio,
          },
        ])
        .select()
        .single();

      if (studentError) {
        console.error("Student error:", studentError);
        throw studentError;
      }

      const newStudentId = studentData.id;

      // Add student programs
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("id")
        .eq("program_name", studentSpecialization)
        .single();

      if (programError) {
        console.error("Program error:", programError);
        throw programError;
      }

      const { error: studentProgramError } = await supabase
        .from("student_programs")
        .insert([{ student_id: newStudentId, program_id: programData.id }]);

      if (studentProgramError) {
        console.error("Student program error:", studentProgramError);
        throw studentProgramError;
      }

      // Gather the specializations the user selected
      const selectedSpecializations = Object.entries(fieldOfInterest)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      // If the user didn't select any specializations
      if (selectedSpecializations.length === 0) {
        setLoading(false);
        return;
      }

      // Look up those specializations in the table to get their IDs
      const { data: specializationData, error: specializationError } =
        await supabase
          .from("specializations")
          .select("id", "specialization_name")
          .in("specialization_name", selectedSpecializations);

      if (specializationError) {
        console.error("Specialization error:", specializationError);
        throw specializationError;
      }

      // Insert into the join table: student_specializations
      const recordsToInsert = specializationData.map((spec) => ({
        student_id: newStudentId,
        specialization_id: spec.id,
      }));

      const { error: joinError } = await supabase
        .from("student_specializations")
        .insert(recordsToInsert);

      if (joinError) {
        console.error("Join error:", joinError);
        throw joinError;
      }

      // Success handling
      setName("");
      setStudentSpecialization("");
      setEmail("");
      setPassword("");
      setStudentBio("");
      setLinkedIn("");
      setPortfolio("");
      setAcceptedTerms(false);
      setSelectedFile(null);
      setFieldOfInterest({
        ui: false,
        ux: false,
        three_d: false,
        branding: false,
        motion: false,
        frontend: false,
        backend: false,
        fullstack: false,
      });

      // Show success message
      router.push("/thank-you"); // Redirect to a thank you page or show a success message
    } catch (error) {
      console.error("Registreringsfel: ", error);
      setErrorMessage("Ett oväntat fel uppstod: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="student-signup-form" className={styles["signup-form-section"]}>
      <div className={styles["inner-wrapper"]}>
        <HeaderWithLogo>ANMÄLAN</HeaderWithLogo>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          action=""
        >
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

            <TextAreaField
              label="HISSPITCH OM DIG"
              placeholder="Jag studerar..."
              value={studentBio}
              display="block"
              paragraphText="(Visas i studentprofil för företag)"
              onChange={(e) => setStudentBio(e.target.value)}
            />
            <div>
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
            <ImageUpload
              label="ADDERA BILD"
              paragraph="(Visas i studentprofil för företag)"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
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
