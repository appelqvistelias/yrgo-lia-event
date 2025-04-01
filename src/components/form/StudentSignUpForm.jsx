"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./StudentSignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";

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
              bio: studentBio,
              linkedin: linkedIn,
              github: portfolio,
              // add email
              // add password
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
  
        // 5) Insert into the join table: student_specializations
        const recordsToInsert = specializationData.map((spec) => ({
          student_id: newStudentId,
          specializations_id: spec.id,
        }));
  
        const { error: joinError } = await supabase
          .from("student_specializations")
          .insert(recordsToInsert);
  
        if (joinError) throw joinError;
  
        // If everything succeeded, do success handling here
        // Add redirect
        console.log("Student and specializations inserted successfully!");
      } catch (error) {
        console.log(error);
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
                value={true}
                onChange={(value) => setStudentSpecialization(value)}
            />

            <ChoiceButton
                label="WU"
                value={true}
                onChange={(value) => setStudentSpecialization(value)}
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
          label="Password:"
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
              label="Branding"
              value="branding"
              onChange={(value) =>
                setFieldOfInterest({ ...fieldOfInterest, branding: value })
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