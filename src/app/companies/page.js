import React from "react";
import FilteredCompanies from "@/components/filters/FilteredCompanies";
import Navbar from "@/components/navbar/Navbar";

export default function CompanyCards() {
  return (
    <>
      <Navbar />
      <FilteredCompanies />
    </>
  );
}
