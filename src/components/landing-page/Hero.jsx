import styles from "./Hero.module.css";
import VideoWindow from "@/components/landing-page/VideoWindow";
import Divider from "@/components/layouts/Divider";
import CTAButton from "@/components/buttons/CTAButton";
import YrgoLogoMobile from "@/icons/hero-yrgo-mobile.svg";
import BarcodeMobile from "@/icons/hero-barcode-mobile.svg";
import YrgoLogoDesktop from "@/icons/hero-yrgo-desktop.svg";
import BarcodeDesktop from "@/icons/hero-barcode-desktop.svg";
import RedirectButton from "@/components/buttons/RedirectButton";

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.innerWrapper}>
          <VideoWindow />
          <Divider />
          <div className={styles.headingWrapper}>
            <h1 className={styles.heading}>lia expressen</h1>
            <div>
              <CTAButton>sign up!</CTAButton>
            </div>
          </div>
          <Divider />
          <div className={styles.whenAndWhereWrapper}>
            <div className={styles.whenAndWhere}>
              <p className={styles.textStrong}>datum</p>
              <p>23 april</p>
            </div>
            <div className={styles.whenAndWhere}>
              <p className={styles.textStrong}>tid</p>
              <p>13:00 – 15:00</p>
            </div>
            <div className={styles.whenAndWhere}>
              <p className={styles.textStrong}>var?</p>
              <p>visual arena</p>
            </div>
          </div>
          <Divider />
          <div className={styles.LogoBarcodeMobile}>
            <YrgoLogoMobile />
            <BarcodeMobile />
          </div>
          <div className={styles.LogoBarcodeDesktop}>
            <YrgoLogoDesktop />
            <BarcodeDesktop />
          </div>
        </div>
      </section>

      <section className={styles.eventDetails}>
        <h2 className={styles.underHeading}>eventet</h2>
        <div className={styles.eventDetailsWrapper}>
          <div className={styles.eventDetailsText}>
            <p className={styles.textStrong}>13:00</p>
            <p>mingel</p>
          </div>
          <div className={styles.eventDetailsText}>
            <p className={styles.textStrong}>13:30</p>
            <p>föredrag</p>
          </div>
          <div className={styles.eventDetailsText}>
            <p className={styles.textStrong}>15:00</p>
            <p>slut</p>
          </div>
        </div>
        <Divider margin="1.9rem 0" borderColor="#ffffff" />
        <div className={styles.eventInfoText}>
          <p>
            Välkomna på mingelevent för att hitta framtida medarbetare i ert
            företag eller bara jobba tillsammans under LIA. Ni kommer att träffa
            Webbutvecklare och Digital Designers från Yrgo som vill visa vad de
            har jobbat med under året och vi hoppas att ni hittar en match
          </p>
          <p className={styles.eventWelcome}>
            Varmt välkomna önskar Webbutvecklare och Digital Designer!
          </p>
        </div>
        <Divider margin="1.9rem 0" borderColor="#ffffff" />
        <div className={styles.signUpHere}>
          <h2 className={styles.signUpHereHeader}>anmäl dig här</h2>
          <div className={styles.redirectButtons}>
            <RedirectButton href="/company-signup">företag</RedirectButton>
            <RedirectButton href="/student-signup">studenter</RedirectButton>
          </div>
        </div>
      </section>
    </>
  );
}
