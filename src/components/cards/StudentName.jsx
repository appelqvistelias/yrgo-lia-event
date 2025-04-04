import styles from "./StudentName.module.css";

export default function StudentName({ name, program }) {
  // Function to convert program name to shorthand
  function programShorthand(program) {
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
    <div className={styles.studentName}>
      <h2>{name}</h2>
      <p>{programShorthand(program)}</p>
    </div>
  );
}
