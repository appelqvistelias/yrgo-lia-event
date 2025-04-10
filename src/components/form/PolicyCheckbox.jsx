import styles from "./PolicyCheckbox.module.css";

const PolicyCheckbox = ({ accept, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        id="acceptedTerms"
        type="checkbox"
        checked={accept}
        onChange={onChange}
        required
      />
      <label className={styles.label} htmlFor="acceptedTerms">
        Jag har tagit del av informationen om min personliga integritet.{" "}
        <a
          href="/villkor"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          Läs vår integritetspolicy.
        </a>
      </label>
    </div>
  );
};

export default PolicyCheckbox;
