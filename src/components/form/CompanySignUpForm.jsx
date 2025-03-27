import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./CompanySignUpForm.module.css";
import ChoiceButton from "../buttons/ChoiceButton";
import SendButton from "../buttons/SendButton";
import InputField from "../input-fields/InputField";

export default function CompanySignUpForm() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [lookingForIntership, setlookingForIntership] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldOfInterest, setFieldOfInterest] = useState({
    frontend: false,
    backend: false,
    fullstack: false,
    ui: false,
    ux: false,
    "3D": false,
    motion: false,
    branding: false,
  });

  const handleSubmit = async () => {
    if (!name || !companyName || !email || !acceptedTerms) {
      setErrorMessage(
        "Vänligen fyll i alla fält och acceptera villkoren för att kunna skicka in anmälan."
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.from("companies").insert([
        {
          full_name: name,
          company_name: companyName,
          want_lia: lookingForIntership,
          // add email and field of interest as needed
        },
      ]);
      if (error) {
        setErrorMessage("Failed to submit data:" + error.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
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
