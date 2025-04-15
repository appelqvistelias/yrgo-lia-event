"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (userError || !userData) {
        router.push("/");
        return;
      }

      const roleId = userData.role;

      if (roleId === 1) {
        router.push("/student");
      } else {
        router.push("/");
      }
    };

    redirectUser();
  }, [router]);

  return <p style={{ color: "white" }}>Omdirigerar...</p>;
}
