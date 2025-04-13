import styles from "./StudentProfile.module.css";
import StudentCard from "@/components/cards/StudentCard";
import EditIcon from "../../icons/edit.svg";
import Wrapper from "../layouts/Wrapper";
import Link from "next/link";
import StudentProfileCard from "./StudentProfileCard";
import LayoutCard from "../layouts/LayoutCard";

export default function StudentProfile({ student }) {
  if (!student) {
    return <p>Ingen studentdata tillgänglig</p>;
  }

  const fieldOfInterest = student.student_specializations
    ? student.student_specializations.map(
        (item) => item.specializations.specialization_name
      )
    : [];

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
            image={student.images[0].url}
            fieldOfInterest={fieldOfInterest}
          />
          <Link href="/profile/edit" className={styles.edit}>
            <p className={styles.editText}>Edit</p>
            <EditIcon className={styles.icon} />
          </Link>
        </section>
        <section className={styles.companies}>
          <h2 className={styles.companiesHeader}>Företag för dig</h2>
        </section>
      </div>
    </div>
  );
}
