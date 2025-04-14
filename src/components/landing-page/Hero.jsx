import styles from "./Hero.module.css";
import VideoWindow from "@/components/landing-page/VideoWindow";
import Divider from "@/components/layouts/Divider";
import CTAButton from "@/components/buttons/CTAButton";
import LogoBarcode from "@/icons/logo-barcode.svg";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.innerWrapper}>
        <VideoWindow />
        <Divider margin="1rem 0" />
        <div className={styles.textWrapper}>
          <h1 className={styles.heading}>lia expressen</h1>
          <div>
            <CTAButton>sign up!</CTAButton>
          </div>
        </div>
        <Divider margin="1rem 0" />
        <div className={styles.eventInfoWrapper}>
          <div className={styles.eventInfo}>
            <p className={styles.eventTextStrong}>datum</p>
            <p>23 april</p>
          </div>
          <div className={styles.eventInfo}>
            <p className={styles.eventTextStrong}>tid</p>
            <p>13:00 – 15:00</p>
          </div>
          <div className={styles.eventInfo}>
            <p className={styles.eventTextStrong}>var?</p>
            <p>visual arena</p>
          </div>
        </div>
        <Divider margin="1rem 0" />
        <LogoBarcode />
      </div>
    </section>
  );
}
