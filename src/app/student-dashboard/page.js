"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/student-login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <p>Laddar...</p>;
  }

  return (
    <div>
      <h1>Välkommen, {user.email}!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/student-login");
        }}
      >
        Logga ut
      </button>
    </div>
  );
}
