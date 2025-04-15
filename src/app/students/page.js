import React from "react";
import FilteredStudents from "@/components/filters/FilteredStudents";
import Navbar from "@/components/navbar/Navbar";

export default function StudentCards() {
  return (
    <>
      <Navbar />
      <FilteredStudents />
    </>
  );
}
