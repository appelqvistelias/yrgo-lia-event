"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import InputField from "../input-fields/InputField";
import SendButton from "../buttons/SendButton";
import Wrapper from "../layouts/Wrapper";
import LayoutCard from "../layouts/LayoutCard";
import HeaderWithLogoAndBorder from "../layouts/HeaderWithLogoAndBorder";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      // Set a custom error message
      setError("Fel e-postadress eller lösenord. Försök igen.");
      return;
    }

    const userId = authData.user.id;

    // Fetch role from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userError) {
      setError("Kunde inte hämta användarroll.");
      return;
    }

    // Redirect user back to landing page
    router.push("/");
  };

  return (
    <Wrapper padding="1.5rem" gap="1rem" alignItems="center">
      <LayoutCard>
        <form onSubmit={handleLogin} className={styles.formContainer}>
          <HeaderWithLogoAndBorder>Logga in!</HeaderWithLogoAndBorder>

          <fieldset className={styles.inputContainer}>
            <InputField
              label="MAIL:"
              type="email"
              placeholder="Din e-post..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="LÖSENORD:"
              type="password"
              placeholder="Ditt lösenord..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </fieldset>

          <SendButton>Logga in</SendButton>
        </form>
      </LayoutCard>
    </Wrapper>
  );
}
