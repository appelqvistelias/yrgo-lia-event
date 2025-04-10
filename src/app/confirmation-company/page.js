import React from "react";
import LayoutCard from "@/components/layouts/LayoutCard";
import LayoutParagraph from "@/components/layouts/LayoutParagraph";
import Wrapper from "@/components/layouts/wrapper";
import HeaderWithLogoAndBorder from "@/components/layouts/HeaderWithLogoAndBorder";

export default function Confirmation() {
  return (
    <Wrapper padding="1.5rem" gap="1rem">
      <LayoutCard>
        <HeaderWithLogoAndBorder>TACK FÖR DIN ANMÄLAN!</HeaderWithLogoAndBorder>
        <LayoutParagraph
          paragraphText={`Vi ser fram emot att träffa dig ombord på LIA Expressen och ge dig möjlighet att upptäcka framtidens digitala talanger.\n\nTills dess, fundera på vad du letar efter hos en framtida medarbetare.\nHör av dig om du har frågor!`}
        />
      </LayoutCard>
    </Wrapper>
  );
}
