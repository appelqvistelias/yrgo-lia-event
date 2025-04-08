import React from "react";
import Wrapper from "../../components/layouts/Wrapper";
import CompanySignUpForm from "../../components/form/CompanySignUpForm";
import HeaderWithLogo from "@/components/layouts/HeaderWithLogo";

export default function CompanySignup() {
  return (
    <Wrapper padding="1rem 1.5rem">
      <HeaderWithLogo>Anmälan</HeaderWithLogo>
      <CompanySignUpForm />
    </Wrapper>
  );
}
