import styles from "./StudentName.module.css";

export default function StudentName({ name, program }) {
  // Function to convert program name to abbreviation
  function programAbbreviation(program) {
    switch (program.toLowerCase()) {
      case "digital design":
        return "DD";
      case "webbutveckling":
        return "WU";
      default:
        return "";
    }
  }

  return (
    <div className={styles.studentNameContainer}>
      <h2 className={styles.studentName}>{name}</h2>
      <p className={styles.programName}>{programAbbreviation(program)}</p>
    </div>
  );
}
