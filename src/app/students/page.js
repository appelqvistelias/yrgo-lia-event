import React from "react";
import FilteredStudents from "@/components/filters/FilteredStudents";
import StudentCard from "@/components/cards/StudentCard";

export default function StudentCards() {
  return (
    <div>
      <div>
        <StudentCard />
      </div>
      {/* <FilteredStudents /> */}
    </div>
  );
}
