import React from "react";
import FilteredStudents from "@/components/filters/FilteredStudents";
import StudentCard from "@/components/cards/StudentCard";

export default function StudentCards() {
  return (
    <div style={{ backgroundColor: "#001a52;" }}>
      <StudentCard />

      {/* <FilteredStudents /> */}
    </div>
  );
}
