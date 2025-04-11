import styles from "./StudentProfile.module.css";
import StudentCard from "@/components/cards/StudentCard";

export default function StudentProfile({ student }) {
  if (!student) {
    return <p>Ingen studentdata tillgänglig</p>;
  }

  return (
    <StudentCard
      studentName={student.full_name || "Namn saknas"}
      education={student.student_programs[0].programs.program_name || "Student"}
      infoText={student.bio || "No information available"}
      image={student.images[0].url}
      fieldOfInterest={student.specializations || []} // Anpassa vid behov
    />
  );
}
