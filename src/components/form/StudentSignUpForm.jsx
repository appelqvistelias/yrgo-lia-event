"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./StudentSignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";

// Function to validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function StudentSignUpForm() {
  const [name, setName] = useState("");
  const [studentSpecialization, setStudentSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // 1) Basic validation
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
      // 2) Register user in Supabase Auth
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

      // 3) Insert user into the users table
      const { error: userError } = await supabase
        .from("users")
        .insert([{ id: userId, email, role: 1 }]); // 1 = student

      if (userError) {
        console.error("User error:", userError);
        throw userError;
      }

      // 4) Insert student i students table and get ID
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

      // 5) Add student programs
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

      // 6) Gather the specializations the user selected
      const selectedSpecializations = Object.entries(fieldOfInterest)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      // If the user didn't select any specializations
      if (selectedSpecializations.length === 0) {
        setLoading(false);
        return;
      }

      // 7) Look up those specializations in the table to get their IDs
      const { data: specializationData, error: specializationError } =
        await supabase
          .from("specializations")
          .select("id", "specialization_name")
          .in("specialization_name", selectedSpecializations);

      if (specializationError) {
        console.error("Specialization error:", specializationError);
        throw specializationError;
      }

      // 8) Insert into the join table: student_specializations
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

      // If everything succeeded, do success handling here
      // Add redirect
      console.log("Student and specializations inserted successfully!");
    } catch (error) {
      console.error("Registreringsfel: ", error);
      setErrorMessage("Ett oväntat fel uppstod: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      action=""
    >
      <h1>Anmälan</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <InputField
        label="Fullständigt namn:"
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <fieldset>
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

      <InputField
        label="Mail:"
        type="email"
        placeholder="dittnamn@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Lösenord:"
        type="password"
        placeholder="Välj ett starkt lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <fieldset>
        <legend>Inom vilket område?</legend>
        <p>(Du kan välja flera)</p>
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
            setFieldOfInterest((prev) => ({ ...prev, three_d: !prev.three_d }))
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
            setFieldOfInterest((prev) => ({ ...prev, motion: !prev.motion }))
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
            setFieldOfInterest((prev) => ({ ...prev, backend: !prev.backend }))
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

      <InputField
        label="Hisspitch om dig:"
        type="text"
        placeholder="En kort presentation"
        value={studentBio}
        onChange={(e) => setStudentBio(e.target.value)}
      />
      <InputField
        label="LinkedIn:"
        type="text"
        placeholder="Din LinkedIn-profil"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
      />
      <InputField
        label="Portfolio:"
        type="text"
        placeholder="Din portfolio"
        value={portfolio}
        onChange={(e) => setPortfolio(e.target.value)}
      />

      <div>
        <input
          id="acceptedTerms"
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <label htmlFor="acceptedTerms">
          Jag har tagit del av informationen om min personliga integritet.{" "}
          <a href="/villkor" target="_blank" rel="noreferrer">
            Läs vår integritetspolicy.
          </a>
        </label>
      </div>

      <SendButton disabled={loading}>Skicka</SendButton>
    </form>
  );
}
