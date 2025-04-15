import styles from "./SocialLink.module.css";
import Github from "@/icons/github.svg";
import Portfolio from "@/icons/portfolio.svg";
import Mail from "@/icons/mail.svg";

export default function SocialLink({ url }) {
  const getIcon = (url) => {
    if (!url) return null;

    if (url.includes("github.com")) {
      return <Github className={styles.icon} />;
    }
    if (url.includes("linkedin.com")) {
      return <Portfolio className={styles.icon} />;
    }
    if (url.includes("@")) {
      return <Mail className={styles.icon} />;
    }
    // For any other URL, show portfolio icon
    return <Portfolio className={styles.icon} />;
  };

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {getIcon(url)}
    </a>
  ) : null;
}
