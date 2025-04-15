"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import YrgoLogoMobile from "@/icons/yrgo-navbar-logo-mobile.svg";
import HamburgerIcon from "@/icons/nav-hamburger-mobile.svg";
import HamburgerX from "@/icons/nav-cross-mobile.svg";
import YrgoLogoDesktop from "@/icons/yrgo-navbar-logo-desktop.svg";
import Divider from "@/components/layouts/Divider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoMobile}>
          <a href="/">
            <YrgoLogoMobile />
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HamburgerX /> : <HamburgerIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.upperMenu}>
            <div className={styles.menuGroup}>
              <span className={styles.menuHeader}>Sign Up</span>
              <div className={styles.menuLinks}>
                <a className={styles.menuLink} href="/company-signup">
                  Företag
                </a>
                <a className={styles.menuLink} href="/student-signup">
                  Studenter
                </a>
              </div>
            </div>

            <div className={styles.menuGroup}>
              <span className={styles.menuHeader}>Vilka du möter</span>
              <div className={styles.menuLinks}>
                <a className={styles.menuLink} href="/companies">
                  Företag
                </a>
                <a className={styles.menuLink} href="/students">
                  Studenter
                </a>
              </div>
            </div>
          </div>

          <Divider margin="1.5rem 0" />

          <a className={styles.menuLink} href="/login">
            <span className={styles.menuHeader}>Logga in</span>
          </a>
        </div>
      )}

      <div className={styles.logoLinksDesktop}>
        <div className={styles.logoDesktop}>
          <YrgoLogoDesktop />
        </div>
        <a href="/">Sign Up</a>
        <a href="/">Vilka du möter</a>
        <a href="/login">Logga in</a>
      </div>
    </nav>
  );
}
