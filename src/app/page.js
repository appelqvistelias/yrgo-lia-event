"use client";

import React from "react";
import Link from "next/link";
import MainContainer from "@/components/landing-page/MainContainer";
import Section from "@/components/landing-page/Section";
import VideoWindow from "@/components/landing-page/VideoWindow";

export default function Page() {
  return (
    <MainContainer>
      <Section>
        <VideoWindow />
      </Section>
    </MainContainer>
  );
}
