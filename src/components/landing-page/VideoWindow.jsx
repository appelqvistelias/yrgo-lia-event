import styles from "./VideoWindow.module.css";

export default function VideoWindow() {
  return (
    <div className={styles.videoContainer}>
      <video className={styles.video} autoPlay loop muted>
        <source src="/lia-express-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
