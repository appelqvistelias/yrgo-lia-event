import React, { useState, useEffect } from "react";
import styles from "./FilterDropDown.module.css";
import { useRouter } from "next/router";

export default function FilterDropDown({ onFilterChange }) {
  //Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  // Dropdown options
  const programOptions = ["Digital Design", "Webbutveckling"];
  const [specializationOptions, setSpecializationOptions] = [
    "Frontend",
    "Backend",
    "Fullstack",
    "UX",
    "3D",
    "Motion",
    "Branding",
  ];

  // State for selected options
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
}
