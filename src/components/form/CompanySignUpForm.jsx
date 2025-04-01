"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import styles from "./CompanySignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";

// Function to validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function CompanySignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [lookingForInternship, setlookingForInternship] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldOfInterest, setFieldOfInterest] = useState({
    frontend: false,
    backend: false,
    fullstack: false,
    ui: false,
    ux: false,
    "3d": false,
    motion: false,
    branding: false,
  });

  const handleSubmit = async () => {
    // 1) Basic validation
    if (!name || !companyName || !email || !acceptedTerms) {
      setErrorMessage(
        "Vänligen fyll i alla fält och acceptera villkoren för att kunna skicka in anmälan."
      );
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Vänligen ange en giltig e-postadress.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // 2) Insert the company and get its ID
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert([
          {
            full_name: name,
            company_name: companyName,
            want_lia: lookingForInternship,
            email: email,
          },
        ])
        .select()
        .single();

      if (companyError) {
        setErrorMessage("Det gick inte att registrera företaget. Försök igen.");
        return;
      }

      const newCompanyId = companyData.id;

      // 3) Gather the specializations the user selected
      const selectedSpecializations = Object.keys(fieldOfInterest).filter(
        (spec) => fieldOfInterest[spec] === true
      );

      // Only proceed with specialization insert if any were selected
      if (selectedSpecializations.length > 0) {
        // 4) Look up those specializations in the table to get their IDs
        const { data: specializationData, error: specializationError } =
          await supabase
            .from("specializations")
            .select("id, specialization_name")
            .in("specialization_name", selectedSpecializations);

        if (specializationError) {
          setErrorMessage(
            "Det gick inte att spara intresseområden. Försök igen."
          );
          return;
        }

        // 5) Insert into the join table: company_specializations
        const recordsToInsert = specializationData.map((spec) => ({
          company_id: newCompanyId,
          specializations_id: spec.id,
        }));

        const { error: joinError } = await supabase
          .from("company_specializations")
          .insert(recordsToInsert);

        if (joinError) throw joinError;
      }

      // Success handling
      setName("");
      setCompanyName("");
      setEmail("");
      setlookingForInternship(false);
      setAcceptedTerms(false);
      setFieldOfInterest({
        frontend: false,
        backend: false,
        fullstack: false,
        ui: false,
        ux: false,
        "3d": false,
        motion: false,
        branding: false,
      });

      // Show success message
      alert("Tack för din anmälan!"); // Consider using a proper notification system
      router.push("/thank-you"); // Redirect to a thank you page or show a success message
    } catch (error) {
      console.error(error);
      setErrorMessage("Ett oväntat fel uppstod. Vänligen försök igen senare.");
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
        label="Namn:"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Företag:"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <InputField
        label="Mail:"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <fieldset>
        <legend>Söker ni LIA?</legend>
        <ChoiceButton
          label="Ja"
          value={true}
          onChange={(value) => setlookingForInternship(value)}
        />
        <ChoiceButton
          label="Nej"
          value={false}
          onChange={(value) => setlookingForInternship(value)}
        />
      </fieldset>

      <fieldset>
        <legend>Intresseområden:</legend>
        <ChoiceButton
          label="Frontend"
          value={fieldOfInterest.frontend}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, frontend: newValue })
          }
        />
        <ChoiceButton
          label="Backend"
          value={fieldOfInterest.backend}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, backend: newValue })
          }
        />
        <ChoiceButton
          label="Fullstack"
          value={fieldOfInterest.fullstack}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, fullstack: newValue })
          }
        />
        <ChoiceButton
          label="UI"
          value={fieldOfInterest.ui}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, ui: newValue })
          }
        />
        <ChoiceButton
          label="UX"
          value={fieldOfInterest.ux}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, ux: newValue })
          }
        />
        <ChoiceButton
          label="3D"
          value={fieldOfInterest["3d"]}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, "3d": newValue })
          }
        />
        <ChoiceButton
          label="Motion"
          value={fieldOfInterest.motion}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, motion: newValue })
          }
        />
        <ChoiceButton
          label="Branding"
          value={fieldOfInterest.branding}
          onChange={(newValue) =>
            setFieldOfInterest({ ...fieldOfInterest, branding: newValue })
          }
        />
      </fieldset>

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
