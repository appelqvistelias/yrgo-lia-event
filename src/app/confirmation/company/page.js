"use client";

import React from "react";
import LayoutCard from "@/components/layouts/LayoutCard";
import LayoutParagraph from "@/components/layouts/LayoutParagraph";
import Wrapper from "@/components/layouts/Wrapper";
import HeaderWithLogoAndBorder from "@/components/layouts/HeaderWithLogoAndBorder";
import ButtonsText from "@/components/layouts/ButtonsText";
import Navbar from "@/components/navbar/Navbar";

export default function Confirmation() {
  return (
    <>
      <Navbar />
      <Wrapper padding="1.5rem" gap="1rem" alignItems="center">
        <LayoutCard>
          <HeaderWithLogoAndBorder>
            TACK FÖR DIN ANMÄLAN!
          </HeaderWithLogoAndBorder>
          <LayoutParagraph
            paragraphText={`Vi ser fram emot att träffa dig ombord på LIA Expressen och ge dig möjlighet att upptäcka framtidens digitala talanger.\n\nTills dess, fundera på vad du letar efter hos en framtida medarbetare.\nHör av dig om du har frågor!`}
          />
          <ButtonsText
            text="Nyfiken på vilka som kommer?"
            leftButtonText="Studenter"
            leftButtonLink="/students"
            rightButtonText="Företag"
            rightButtonLink="/companies"
          />
        </LayoutCard>
      </Wrapper>
    </>
  );
}
