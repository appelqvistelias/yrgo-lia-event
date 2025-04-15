"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import StudentForm from "./StudentForm"; // Importera den nya komponenten

export default function StudentSignUpForm() {
  const router = useRouter();

  const handleSignup = async (formData) => {
    const {
      name,
      studentSpecialization,
      email,
      password,
      selectedFile,
      studentBio,
      linkedIn,
      portfolio,
      fieldOfInterest,
    } = formData;

    try {
      // Registrera användare med Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) {
        throw new Error("Kunde inte registrera konto: " + authError.message);
      }
      if (!authData?.user) {
        throw new Error("Registreringen misslyckades, försök igen.");
      }

      const userId = authData.user.id;

      // Ladda upp profilbild om vald
      let imageUrl = null;
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("user-images")
          .upload(filePath, selectedFile);
        if (uploadError) {
          throw new Error("Kunde inte ladda upp bild: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("user-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData?.publicUrl;
      }

      // Lägg in användaren i users-tabellen
      const { error: userError } = await supabase
        .from("users")
        .insert([{ id: userId, email, role: 1 }]); // 1 = student
      if (userError) {
        throw userError;
      }

      // Spara bild i databasen om den laddades upp
      if (imageUrl) {
        const { error: imageInsertError } = await supabase
          .from("images")
          .insert([
            {
              user_id: userId,
              url: imageUrl,
            },
          ]);
        if (imageInsertError) {
          throw new Error(
            "Kunde inte spara bild i databasen: " + imageInsertError.message
          );
        }
      }

      // Lägg in student i students-tabellen
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .insert([
          {
            user_id: userId,
            full_name: name,
            bio: studentBio,
            linkedin: linkedIn,
            portfolio: portfolio,
          },
        ])
        .select()
        .single();
      if (studentError) {
        throw studentError;
      }
      const newStudentId = studentData.id;

      // Koppla student till valt program
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("id")
        .eq("program_name", studentSpecialization)
        .single();
      if (programError) {
        throw programError;
      }
      const { error: studentProgramError } = await supabase
        .from("student_programs")
        .insert([{ student_id: newStudentId, program_id: programData.id }]);
      if (studentProgramError) {
        throw studentProgramError;
      }

      // Hantera valda specialiseringar
      const selectedSpecializations = Object.entries(fieldOfInterest)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      if (selectedSpecializations.length > 0) {
        const { data: specializationData, error: specializationError } =
          await supabase
            .from("specializations")
            .select("id", "specialization_name")
            .in("specialization_name", selectedSpecializations);
        if (specializationError) {
          throw specializationError;
        }
        const recordsToInsert = specializationData.map((spec) => ({
          student_id: newStudentId,
          specialization_id: spec.id,
        }));
        const { error: joinError } = await supabase
          .from("student_specializations")
          .insert(recordsToInsert);
        if (joinError) {
          throw joinError;
        }
      }

      router.push("/confirmation/student");
    } catch (error) {
      console.error("Registreringsfel: ", error);
      alert("Ett oväntat fel uppstod: " + error.message);
    }
  };

  return (
    <StudentForm
      initialValues={{
        name: "",
        studentSpecialization: "",
        email: "",
        password: "",
        selectedFile: null,
        studentBio: "",
        linkedIn: "",
        portfolio: "",
        acceptedTerms: false,
        fieldOfInterest: {
          ui: false,
          ux: false,
          three_d: false,
          branding: false,
          motion: false,
          frontend: false,
          backend: false,
          fullstack: false,
        },
      }}
      headerTitle="ANMÄLAN"
      onSubmit={handleSignup}
    />
  );
}
