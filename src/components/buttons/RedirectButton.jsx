import Link from "next/link";
import styles from "./RedirectButton.module.css";

export default function RedirectButton({ href, children }) {
  return (
    <Link href={href} className={styles.button}>
      <span className={styles.buttonText}>{children}</span>
    </Link>
  );
}
