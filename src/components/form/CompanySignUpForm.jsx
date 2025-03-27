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
  const [accepetedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [successMessage, setSuccessMessage] = useState(""); Maybe we will need this later
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
    if (!name || !companyName || !email || !accepetedTerms) {
      setErrorMessage(
        "Vänligen fyll i alla fält och acceptera villkoren för att kunna skicka in anmälan."
      ); //Change this to correct message later?
      return;
    }

    setLoading(true);
    setErrorMessage("");
  };

  return <div>{/* Add your form JSX here */}</div>;
}
