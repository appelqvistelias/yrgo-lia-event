import React from "react";
import LayoutCard from "@/components/layouts/LayoutCard";
import LayoutParagraph from "@/components/layouts/LayoutParagraph";
import Wrapper from "@/components/layouts/wrapper";

export default function Confirmation() {
  return (
    <Wrapper padding="1.5rem" gap="1rem">
      <LayoutCard>
        <LayoutParagraph
          paragraphText={`Kul att du vill hoppa ombord på LIA Expressen! Det här är din chans att visa upp ditt arbete och nätverka med branschfolk.\n\nSe till att din portfolio är uppdaterad och förbered dig på att presentera ditt arbete. Hör av dig om du har frågor!`}
        />
      </LayoutCard>
    </Wrapper>
  );
}
