import styles from "./Hero.module.css";
import VideoWindow from "@/components/landing-page/VideoWindow";
import Divider from "@/components/layouts/Divider";
import CTAButton from "@/components/buttons/CTAButton";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.innerWrapper}>
        <VideoWindow />
        <Divider margin="1rem 0" />
        <h1 className={styles.heading}>lia expressen</h1>
        <CTAButton>SIGN UP!</CTAButton>
        <Divider margin="1rem 0" />
      </div>
    </section>
  );
}
