"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import styles from "./CompanySignUpForm.module.css";
import Wrapper from "../layouts/Wrapper";
import HeaderWithLogo from "../layouts/HeaderWithLogo";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";
import TextAreaField from "../input-fields/TextareaField";

// Function to validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function CompanySignUpForm() {
  const router = useRouter();
  const [contactPerson, setContactPerson] = useState(""); //Uppdaterad
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lookingForInternship, setlookingForInternship] = useState(""); //Uppdaterad
  const [companyInfo, setCompanyInfo] = useState(""); //Tillagd
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
    if (!contactPerson || !companyName || !email || !acceptedTerms) {
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

    setLoading(true);
    setErrorMessage("");

    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        setErrorMessage(
          "En användare med denna e-postadress finns redan registrerad."
        );
        return;
      }

      // 2) Register user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setErrorMessage(
            "En användare med denna e-postadress finns redan registrerad. Vänligen använd en annan e-postadress eller logga in."
          );
        } else {
          setErrorMessage(
            "Ett fel uppstod vid registreringen. Vänligen försök igen."
          );
        }
        console.error("Auth error:", authError.message);
        return;
      }

      if (!authData?.user) {
        throw new Error("Registreringen misslyckades, försök igen.");
      }

      const userId = authData.user.id;

      // 3) Insert user into the users table
      const { error: userError } = await supabase
        .from("users")
        .insert([{ id: userId, email, role: 2 }]); // 2 = company

      if (userError) {
        console.error("User error:", userError);
        throw userError;
      }

      // 4) Insert the company and get its ID
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert([
          {
            user_id: userId,
            contact_person: contactPerson,
            company_name: companyName,
            want_lia: lookingForInternship,
            company_info: companyInfo, //Tillagd
          },
        ])
        .select()
        .single();

      if (companyError) {
        console.error("Student error:", companyError);
        throw companyError;
      }

      const newCompanyId = companyData.id;

      // 5) Gather the specializations the user selected
      const selectedSpecializations = Object.entries(fieldOfInterest)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      // If the user didn't select any specializations
      if (selectedSpecializations.length === 0) {
        setLoading(false);
        return;
      }

      // Only proceed with specialization insert if any were selected
      if (selectedSpecializations.length > 0) {
        // 6) Look up those specializations in the table to get their IDs
        const { data: specializationData, error: specializationError } =
          await supabase
            .from("specializations")
            .select("id, specialization_name")
            .in("specialization_name", selectedSpecializations);

        if (specializationError) {
          console.error("Specialization error:", specializationError);
          throw specializationError;
        }

        // 7) Insert into the join table: company_specializations
        const recordsToInsert = specializationData.map((spec) => ({
          company_id: newCompanyId,
          specializations_id: spec.id,
        }));

        const { error: joinError } = await supabase
          .from("company_specializations")
          .insert(recordsToInsert);

        if (joinError) {
          console.error("Join error:", joinError);
          throw joinError;
        }
      }

      // Success handling
      setContactPerson("");
      setCompanyName("");
      setEmail("");
      setPassword("");
      setCompanyInfo("");
      setlookingForInternship("");
      setAcceptedTerms(false);
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
      setErrorMessage("Ett oväntat fel uppstod. Vänligen försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper padding="1.5rem 1.5rem 3.75rem 1.5rem">
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
              label="FÖRETAG"
              type="text"
              placeholder="Vilket företag..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <InputField
              label="KONTAKTPERSON"
              type="text"
              placeholder="Namn"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />

            <InputField
              label="MAIL"
              type="email"
              placeholder="dittföretag@mail.com"
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

            <InputField
              label="SÖKER NI LIA?"
              display="block"
              paragraphText="(Under perioden 24 nov, 2025 – 29 maj, 2026)"
              type="text"
              placeholder="Ja, vi söker 2 st..."
              value={lookingForInternship}
              onChange={(e) => setlookingForInternship(e.target.value)}
            />

            <fieldset className={styles.specializationChoices}>
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
                label="BRANDING"
                value={fieldOfInterest.branding}
                onChange={() =>
                  setFieldOfInterest((prev) => ({
                    ...prev,
                    branding: !prev.branding,
                  }))
                }
              />
              <ChoiceButton
                label="MOTION"
                value={fieldOfInterest.motion}
                onChange={() =>
                  setFieldOfInterest((prev) => ({
                    ...prev,
                    motion: !prev.motion,
                  }))
                }
              />
              <ChoiceButton
                label="FRONTEND"
                value={fieldOfInterest.frontend}
                onChange={() =>
                  setFieldOfInterest((prev) => ({
                    ...prev,
                    frontend: !prev.frontend,
                  }))
                }
              />
              <ChoiceButton
                label="BACKEND"
                value={fieldOfInterest.backend}
                onChange={() =>
                  setFieldOfInterest((prev) => ({
                    ...prev,
                    backend: !prev.backend,
                  }))
                }
              />
              <ChoiceButton
                label="FULLSTACK"
                value={fieldOfInterest.fullstack}
                onChange={() =>
                  setFieldOfInterest((prev) => ({
                    ...prev,
                    fullstack: !prev.fullstack,
                  }))
                }
              />
            </fieldset>

            <TextAreaField
              label="HISSPITCH OM FÖRETAGET"
              placeholder="Vi är ett..."
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
            />

            {/* Add image upload here */}

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
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
