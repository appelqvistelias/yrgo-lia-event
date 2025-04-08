"use client";

//Company filtering for students
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./FilteredCompanies.module.css";
import FilterDropDown from "./FilterDropDown";
import { formatLabel } from "../../utils/formatLabel";
import CompanyCard from "../cards/CompanyCard";

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
  const [activePrograms, setActivePrograms] = useState([]); // Fixed typo in useState
  const [activeSpecializations, setActiveSpecializations] = useState([]);

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch programs
        const { data: programsData, error: programsError } = await supabase
          .from("programs")
          .select("id, program_name"); // Fixed select syntax

        if (programsError) throw programsError;

        // Fetch specializations
        const { data: specializationsData, error: specializationsError } =
          await supabase
            .from("specializations")
            .select("id, specialization_name");

        if (specializationsError) throw specializationsError;

        //Fetch companies with their related data
        const { data: companyData, error: companyError } = await supabase.from(
          "companies"
        ).select(`
            id,
            contact_person,
            company_name,
            want_lia,
            company_info,
            company_specializations!inner (
              specializations_id,
              specializations (id, specialization_name)
            )
          `);

        if (companyError) throw companyError;

        //Format options for dropdown
        const formattedPrograms = programsData.map((program) => ({
          id: program.id.toString(),
          label: formatLabel(program.program_name),
        }));

        const formattedSpecializations = specializationsData.map(
          (specialization) => ({
            id: specialization.id.toString(),
            label: formatLabel(specialization.specialization_name),
          })
        );

        //Process company data to make it easier to work with
        const processedCompanies = companyData.map((company) => {
          // Extract specialization IDs and names
          const specializationIds = company.company_specializations.map((ss) =>
            ss.specializations_id.toString()
          );
          const specializationNames = company.company_specializations.map(
            (ss) => ss.specializations.specialization_name
          );

          // Return a flattened company object
          return {
            id: company.id,
            contact_person: company.contact_person,
            company_name: company.company_name,
            want_lia: company.want_lia,
            company_info: company.company_info,

            specialization_ids: specializationIds,
            specialization_names: specializationNames,
          };
        });
        // Set state with fetched data
        setProgramOptions(formattedPrograms); //Remove?
        setSpecializationOptions(formattedSpecializations);
        setCompanies(processedCompanies);
        setFilteredCompanies(processedCompanies);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle program filter changes
  const handleProgramFilterChange = (selectedPrograms) => {
    setActivePrograms(selectedPrograms);
  };

  // Handle specialization filter changes
  const handleSpecializationFilterChange = (selectedSpecializations) => {
    setActiveSpecializations(selectedSpecializations);
  };

  // Effect to filter companies when active filters change
  useEffect(() => {
    // If no filters are active, show all companies
    if (activePrograms.length === 0 && activeSpecializations.length === 0) {
      setFilteredCompanies(companies);
      return;
    }

    // Filter companies based on active filters
    const filtered = companies.filter((company) => {
      // Check if company matches specialization filter
      const matchesSpecialization =
        activeSpecializations.length === 0 ||
        company.specialization_ids.some((id) =>
          activeSpecializations.includes(id)
        );

      return matchesSpecialization;
    });

    setFilteredCompanies(filtered);
  }, [activePrograms, activeSpecializations, companies]);

  return (
    <div className={styles.container}>
      {/* Filter dropdowns */}
      <div className={styles.header}>
        <h1 className={styles.title}>Företag</h1>
        {isLoading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div>Error loading data: {error}</div>
        ) : (
          <div>
            <FilterDropDown
              title="Filtrera"
              options={[
                { category: "Inriktning", options: specializationOptions },
              ]}
              onFilterChange={handleSpecializationFilterChange}
            />
          </div>
        )}
      </div>

      {/* Display the filtered companies */}
      <div className={styles.cardsContainer}>
        {!isLoading && filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              companyName={company.company_name}
              contactPerson={company.contact_person}
              companyInfo={company.company_info}
              specializationNames={company.specialization_names}
            />
          ))
        ) : !isLoading && filteredCompanies.length === 0 ? (
          <p>No companies match your selected filters.</p>
        ) : null}
      </div>
    </div>
  );
};

export default FilteredCompanies;
