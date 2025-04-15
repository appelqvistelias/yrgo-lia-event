import styles from "./StudentProfile.module.css";
import EditIcon from "../../icons/edit.svg";
import Link from "next/link";
import StudentProfileCard from "./StudentProfileCard";
import YrgoLogo from "@/icons/yrgologo-big.png";

export default function StudentProfile({ student }) {
  if (!student) {
    return <p>Ingen studentdata tillgänglig</p>;
  }

  const fieldOfInterest = student.student_specializations
    ? student.student_specializations.map(
        (item) => item.specializations.specialization_name
      )
    : [];

  // Add fallback for image URL and use .src property
  const imageUrl =
    student.images?.length > 0 ? student.images[0].url : YrgoLogo.src;

  console.log("Image URL:", imageUrl);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.userProfile}>
          <StudentProfileCard
            studentName={student.full_name || "Namn saknas"}
            education={
              student.student_programs[0].programs.program_name || "Student"
            }
            infoText={student.bio || "No information available"}
            image={imageUrl}
            fieldOfInterest={fieldOfInterest}
            links={[student.linkedin, student.portfolio].filter(Boolean)} // Add links and filter out null/undefined values
          />
          <Link href="/edit/student" className={styles.edit}>
            <p className={styles.editText}>Edit</p>
            <EditIcon className={styles.icon} />
          </Link>
        </section>
      </div>
    </div>
  );
}
