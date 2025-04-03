"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CompanyDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.push("/login");
        return;
      }

      const userId = authData.user.id;
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (userError || userData.role !== 2) {
        router.push("/login");
        return;
      }

      setUser(authData.user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <p>Laddar...</p>;
  }

  return (
    <div>
      <h1>Välkommen, {user.email}!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Logga ut
      </button>
    </div>
  );
}
