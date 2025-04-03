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

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/student-dashboard");
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
