"use client";

//Company filtering for students
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import FilterDropDown from "./FilterDropDown";

const FilteredCompanies = () => {
  // State for company data
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filter options
  const [programOptions, setProgramOptions] = useState([]);
  const [specializationOptions, setSpecializationOptions] = useState([]);

  // State for active filters
  const [activePrograms, setActivePrograms] = usestate([]);
  const [activeSpecializations, setActiveSpecializations] = useState([]);
};
