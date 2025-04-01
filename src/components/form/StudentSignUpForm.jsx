"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./StudentSignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";

export default function StudentSignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [studentBio, setStudentBio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldOfInterest, setFieldOfInterest] = useState({
        ui: false,
        ux: false,
        "3D": false,
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
  
      setLoading(true);
      setErrorMessage("");
  
      try {
        // 2) Insert student name and get ID
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .insert([
            {
              full_name: name,
              studentBio: studentBio,
              linkedIn: linkedIn,
              github: github,
              // add email
            },
          ])
          .select()
          .single();
  
        if (studentError) throw studentError;
  
        const newStudentId = studentData.id;
  
        // 3) Gather the specializations the user selected
        const selectedSpecializations = Object.keys(fieldOfInterest).filter(
          (spec) => fieldOfInterest[spec] === true
        );
  
        // If the user didn't select any specializations
        if (selectedSpecializations.length === 0) {
          setLoading(false);
          return;
        }
  
        // 4) Look up those specializations in the table to get their IDs
        const { data: specializationData, error: specializationError } =
          await supabase
            .from("specializations")
            .select("id", "specialization_name")
            .in("specialization_name", selectedSpecializations);
  
        if (specializationError) throw specializationError;
  
        // 5) Insert into the join table: company_specializations
        const recordsToInsert = specializationData.map((spec) => ({
          company_id: newCompanyId,
          specializations_id: spec.id,
        }));
  
        const { error: joinError } = await supabase
          .from("company_specializations")
          .insert(recordsToInsert);
  
        if (joinError) throw joinError;
  
        // If everything succeeded, do success handling here
        // Add redirect
        console.log("Company and specializations inserted successfully!");
      } catch (error) {
        console.error(error);
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
            onChange={(value) => setlookingForIntership(value)}
          />
          <ChoiceButton
            label="Nej"
            value={false}
            onChange={(value) => setlookingForIntership(value)}
          />
        </fieldset>
  
        <fieldset>
          <legend>Intresseområden:</legend>
          <ChoiceButton
            label="Frontend"
            value="frontend"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, frontend: value })
            }
          />
          <ChoiceButton
            label="Backend"
            value="backend"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, backend: value })
            }
          />
          <ChoiceButton
            label="Fullstack"
            value="fullstack"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, fullstack: value })
            }
          />
          <ChoiceButton
            label="UI"
            value="ui"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, ui: value })
            }
          />
          <ChoiceButton
            label="UX"
            value="ux"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, ux: value })
            }
          />
          <ChoiceButton
            label="3D"
            value="3D"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, "3D": value })
            }
          />
          <ChoiceButton
            label="Motion"
            value="motion"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, motion: value })
            }
          />
          <ChoiceButton
            label="Branding"
            value="branding"
            onChange={(value) =>
              setFieldOfInterest({ ...fieldOfInterest, branding: value })
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