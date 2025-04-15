"use client";

import React from "react";
import Link from "next/link";
import MainContainer from "@/components/landing-page/MainContainer";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/navbar/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Hero />
      </MainContainer>
    </>
  );
}
