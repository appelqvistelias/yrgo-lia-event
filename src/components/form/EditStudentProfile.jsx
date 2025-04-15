"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import StudentForm from "@/components/form/StudentForm";

export default function EditStudentProfile() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    name: "",
    studentSpecialization: "",
    email: "",
    password: "",
    selectedFile: null,
    studentBio: "",
    linkedIn: "",
    portfolio: "",
    acceptedTerms: true,
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
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Get logged in user
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData?.user) {
        router.push("/login");
        return;
      }
      const userId = authData.user.id;

      // Get student data from "students" table including specializations
      const { data: student, error } = await supabase
        .from("students")
        .select(
          `
          full_name,
          bio,
          linkedin,
          portfolio,
          student_specializations (
            specializations ( specialization_name )
          )
        `
        )
        .eq("user_id", userId)
        .maybeSingle();

      if (error || !student) {
        console.error("Could not fetch student data:", error);
        router.push("/login");
        return;
      }

      // Map student_specializations to boolean object for fieldOfInterest
      let fieldOfInterest = {
        ui: false,
        ux: false,
        three_d: false,
        branding: false,
        motion: false,
        frontend: false,
        backend: false,
        fullstack: false,
      };

      if (student.student_specializations) {
        student.student_specializations.forEach((item) => {
          if (
            item.specializations &&
            item.specializations.specialization_name
          ) {
            const specName = item.specializations.specialization_name;
            const mapping = {
              UI: "ui",
              UX: "ux",
              "3D": "three_d",
              Branding: "branding",
              Motion: "motion",
              Frontend: "frontend",
              Backend: "backend",
              Fullstack: "fullstack",
            };
            const key = mapping[specName];
            if (key) fieldOfInterest[key] = true;
          }
        });
      }

      // Set initial values
      const newInitialValues = {
        name: student.full_name || "",
        studentSpecialization: "",
        email: authData.user.email || "",
        password: "",
        selectedFile: null,
        studentBio: student.bio || "",
        linkedIn: student.linkedin || "",
        portfolio: student.portfolio || "",
        acceptedTerms: true,
        fieldOfInterest,
      };

      setInitialValues(newInitialValues);
      setLoading(false);
    };

    fetchProfileData();
  }, [router]);

  // Function to handle profile update including image change
  const handleUpdate = async (formData) => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      alert("You must be logged in to edit your profile.");
      router.push("/login");
      return;
    }
    const userId = authData.user.id;

    try {
      // If a new profile image has been selected, upload and update the image
      if (formData.selectedFile) {
        const fileExt = formData.selectedFile.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("user-images")
          .upload(filePath, formData.selectedFile, { upsert: true });
        if (uploadError) {
          throw new Error("Could not upload new image: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("user-images")
          .getPublicUrl(filePath);
        const newImageUrl = publicUrlData?.publicUrl;

        // Check if an image record already exists for the user
        const { data: imageRecord, error: selectError } = await supabase
          .from("images")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();
        if (selectError) {
          throw selectError;
        }

        if (imageRecord) {
          // If a record exists, update it
          const { error: updateImageError } = await supabase
            .from("images")
            .update({ url: newImageUrl })
            .eq("user_id", userId);
          if (updateImageError) {
            throw updateImageError;
          }
        } else {
          // If no record exists, insert a new row
          const { error: imageInsertError } = await supabase
            .from("images")
            .insert([{ user_id: userId, url: newImageUrl }]);
          if (imageInsertError) {
            throw imageInsertError;
          }
        }
      }

      // Update student data
      const { error: updateError } = await supabase
        .from("students")
        .update({
          full_name: formData.name,
          bio: formData.studentBio,
          linkedin: formData.linkedIn,
          portfolio: formData.portfolio,
        })
        .eq("user_id", userId);
      if (updateError) {
        throw updateError;
      }

      // Handle specializations:
      // Get student id
      const { data: studentRecord, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("user_id", userId)
        .single();
      if (studentError || !studentRecord) {
        throw new Error("Could not fetch student ID.");
      }
      const studentId = studentRecord.id;

      // Remove existing specializations
      const { error: deleteError } = await supabase
        .from("student_specializations")
        .delete()
        .eq("student_id", studentId);
      if (deleteError) {
        throw deleteError;
      }

      // Prepare and insert new specializations
      const selectedSpecializations = Object.entries(formData.fieldOfInterest)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      if (selectedSpecializations.length > 0) {
        const { data: specsData, error: specsError } = await supabase
          .from("specializations")
          .select("id, specialization_name")
          .in("specialization_name", selectedSpecializations);
        if (specsError) {
          throw specsError;
        }
        const recordsToInsert = specsData.map((spec) => ({
          student_id: studentId,
          specialization_id: spec.id,
        }));
        const { error: insertSpecsError } = await supabase
          .from("student_specializations")
          .insert(recordsToInsert);
        if (insertSpecsError) {
          throw insertSpecsError;
        }
      }

      alert("Din profil har uppdaterats!");
      // Redirect to student dashboard
      router.push("/student-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <StudentForm
      initialValues={initialValues}
      headerTitle="REDIGERA PROFIL"
      buttonText="Spara ändringar"
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
}
