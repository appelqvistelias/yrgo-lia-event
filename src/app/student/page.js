"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import StudentProfile from "@/components/profile/StudentProfile";
import Navbar from "@/components/navbar/Navbar";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndStudentData = async () => {
      // 1. See if user is logged in
      //    If not, redirect to login page
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData?.user) {
        router.push("/login");
        return;
      }

      const userId = authData.user.id;

      // 2) Check role in users table (student === 1)
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();
      if (userError || userData?.role !== 1) {
        router.push("/login");
        return;
      }

      // 3) Get student profile data
      //    if not found, redirect to login page
      //    if found, set student data
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select(
          `
          id,
          full_name,
          linkedin,
          portfolio,
          bio,
          student_programs (
            student_id,
            programs ( program_name )
          ),
          student_specializations (
            specialization_id,
            specializations ( specialization_name )
          )
        `
        )
        .eq("user_id", userId)
        .maybeSingle();

      if (studentError) {
        console.error("Kunde inte hämta profilinformation:", studentError);
        router.push("/login");
        return;
      }

      // 4) Get user profile image
      const { data: imagesData, error: imagesError } = await supabase
        .from("images")
        .select("id, url")
        .eq("user_id", userId);

      if (imagesError) {
        console.error("Kunde inte hämta bilder:", imagesError);
      }

      // 5) Combine student data with images
      const combinedData = {
        ...studentData,
        images: imagesData || [], // empty array if no images found
      };

      setStudent(combinedData);
      setLoading(false);
    };

    // 6) Call the function to get user and student data
    getUserAndStudentData();
  }, [router]);

  if (loading) {
    return <p>Laddar...</p>;
  }

  /* <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Logga ut
      </button> */

  return (
    <>
      <Navbar />
      <StudentProfile student={student} />
    </>
  );
}
