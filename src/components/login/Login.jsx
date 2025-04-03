"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import InputField from "../input-fields/InputField";
import SendButton from "../buttons/SendButton";

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
      setError(authError.message);
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

    // Send to correct dashboard
    if (userData.role === 1) {
      router.push("/student-dashboard");
    } else if (userData.role === 2) {
      router.push("/company-dashboard");
    } else {
      setError("Okänd roll.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Logga in</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputField
        label="Mail"
        type="email"
        placeholder="Din e-post..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Lösenord"
        type="password"
        placeholder="Ditt lösenord..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SendButton>Logga in</SendButton>
    </form>
  );
}
