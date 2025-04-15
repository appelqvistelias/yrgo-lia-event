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
            paragraphText={`Kul att du vill hoppa ombord på LIA Expressen! Det här är din chans att visa upp ditt arbete och nätverka med branschfolk.\n\nSe till att din portfolio är uppdaterad och förbered dig på att presentera ditt arbete. Hör av dig om du har frågor!`}
          />
          <ButtonsText
            text="Nyfiken på vilka som kommer?"
            leftButtonText="Företag"
            leftButtonLink="/companies"
            rightButtonText="Studenter"
            rightButtonLink="/students"
          />
        </LayoutCard>
      </Wrapper>
    </>
  );
}
