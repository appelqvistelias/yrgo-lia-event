"use client";

//Student filtering for companies
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./FilteredStudents.module.css";
import FilterDropdown from "./FilterDropdown";
import StudentCard from "../cards/StudentCard";
import { formatLabel } from "../../utils/formatLabel";

const FilteredStudents = () => {
  // State for students data
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filter options
  const [programOptions, setProgramOptions] = useState([]);
  const [specializationOptions, setSpecializationOptions] = useState([]);

  // State for active filters
  const [activePrograms, setActivePrograms] = useState([]);
  const [activeSpecializations, setActiveSpecializations] = useState([]);

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch programs
        const { data: programsData, error: programsError } = await supabase
          .from("programs")
          .select("id, program_name");

        if (programsError) throw programsError;

        // Fetch specializations
        const { data: specializationsData, error: specializationsError } =
          await supabase
            .from("specializations")
            .select("id, specialization_name");

        if (specializationsError) throw specializationsError;

        // Fetch students with their related data
        // Note: Remember to add images as well!
        const { data: studentsData, error: studentsError } =
          await supabase.from("students").select(`
            id, 
            full_name, 
            bio,
            linkedin,
            portfolio,
            student_programs!inner (
              program_id,
              programs (id, program_name)
            ),
            student_specializations!inner (
              specialization_id,
              specializations (id, specialization_name)
            )
          `);

        if (studentsError) throw studentsError;

        // Format the options for dropdowns
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

        // Process student data to make it easier to work with
        const processedStudents = studentsData.map((student) => {
          // Extract program IDs and names
          const programIds = student.student_programs.map((sp) =>
            sp.program_id.toString()
          );
          const programNames = student.student_programs.map(
            (sp) => sp.programs.program_name
          );

          // Extract and format specialization IDs and names
          const specializationIds = student.student_specializations.map((ss) =>
            ss.specialization_id.toString()
          );
          const specializationNames = student.student_specializations.map(
            (ss) => ss.specializations.specialization_name
          );

          // Return a flattened student object
          return {
            id: student.id,
            first_name: student.full_name.split(" ")[0],
            bio: student.bio,
            linkedin: student.linkedin,
            portfolio: student.portfolio,
            created_at: student.created_at,
            program_ids: programIds,
            program_names: programNames,
            specialization_ids: specializationIds,
            specialization_names: specializationNames,
          };
        });

        // Set state with fetched data
        setProgramOptions(formattedPrograms);
        setSpecializationOptions(formattedSpecializations);
        setStudents(processedStudents);
        setFilteredStudents(processedStudents);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Handle program filter changes
  const handleProgramFilterChange = (selectedPrograms) => {
    setActivePrograms(selectedPrograms);
  };

  // Handle specialization filter changes
  const handleSpecializationFilterChange = (selectedSpecializations) => {
    setActiveSpecializations(selectedSpecializations);
  };

  // Effect to filter students when active filters change
  useEffect(() => {
    // If no filters are active, show all students
    if (activePrograms.length === 0 && activeSpecializations.length === 0) {
      setFilteredStudents(students);
      return;
    }

    // Filter students based on active filters
    const filtered = students.filter((student) => {
      // Check if student matches program filter (if any active program filters)
      const matchesProgram =
        activePrograms.length === 0 ||
        student.program_ids.some((id) => activePrograms.includes(id));

      // Check if student matches specialization filter (if any active specialization filters)
      const matchesSpecialization =
        activeSpecializations.length === 0 ||
        student.specialization_ids.some((id) =>
          activeSpecializations.includes(id)
        );

      // Student must match both filter types (if active)
      return matchesProgram && matchesSpecialization;
    });

    setFilteredStudents(filtered);
  }, [activePrograms, activeSpecializations, students]);

  // Combine program and specialization options with categories
  const allFilterOptions = [
    {
      category: "Program",
      options: programOptions,
    },
    {
      category: "Inriktning",
      options: specializationOptions,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Studenter</h1>
        {isLoading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div>Error loading data: {error}</div>
        ) : (
          <div>
            <FilterDropdown
              title="Filtrera"
              options={allFilterOptions}
              onFilterChange={(selected) => {
                // Split selected options into programs and specializations
                const selectedPrograms = selected.filter((id) =>
                  programOptions.some((prog) => prog.id === id)
                );
                const selectedSpecializations = selected.filter((id) =>
                  specializationOptions.some((spec) => spec.id === id)
                );

                handleProgramFilterChange(selectedPrograms);
                handleSpecializationFilterChange(selectedSpecializations);
              }}
            />
          </div>
        )}
      </div>

      {/* Display the filtered students */}
      <div className={styles.cardsContainer}>
        {!isLoading && filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              studentName={student.first_name}
              education={student.program_names[0]} // Assuming first program
              infoText={student.bio}
              // image prop will go here
              fieldOfInterest={student.specialization_names}
            />
          ))
        ) : !isLoading && filteredStudents.length === 0 ? (
          <p>No students match your selected filters.</p>
        ) : null}
      </div>
    </div>
  );
};

export default FilteredStudents;
