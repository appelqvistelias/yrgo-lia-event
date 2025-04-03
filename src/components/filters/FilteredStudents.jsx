"use client";

//Student filtering for companies
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import FilterDropdown from "./FilterDropdown";

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
        const { data: studentsData, error: studentsError } =
          await supabase.from("students").select(`
            id, 
            full_name, 
            bio,
            linkedin,
            portfolio,
            created_at,
            user_id,
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
          label: program.program_name,
        }));

        // Process student data to make it easier to work with
        const processedStudents = studentsData.map((student) => {
          // Extract program IDs and names
          const programIds = student.student_programs.map((sp) =>
            sp.program_id.toString()
          );
          const programNames = student.student_programs.map(
            (sp) => sp.programs.program_name
          );

          // Extract specialization IDs and names
          const specializationIds = student.student_specializations.map((ss) =>
            ss.specialization_id.toString()
          );
          const specializationNames = student.student_specializations.map(
            (ss) => ss.specializations.specialization_name
          );

          // Return a flattened student object
          return {
            id: student.id,
            full_name: student.full_name,
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

  return (
    <div>
      <div>
        <h2>Student Directory</h2>

        {isLoading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div>Error loading data: {error}</div>
        ) : (
          <div>
            <FilterDropdown
              title="Filter by Program"
              options={programOptions}
              onFilterChange={handleProgramFilterChange}
            />

            <FilterDropdown
              title="Filter by Specialization"
              options={specializationOptions}
              onFilterChange={handleSpecializationFilterChange}
            />
          </div>
        )}
      </div>

      {/* Display the filtered students */}
      <div>
        {!isLoading && filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id}>
              <h3>{student.full_name}</h3>
              {student.bio && <p>{student.bio}</p>}

              {/* Programs */}
              <div>
                <h4>Programs:</h4>
                <p>{student.program_names.join(", ")}</p>
              </div>

              {/* Specializations */}
              <div>
                <h4>Specializations:</h4>
                <p className="text-gray-600">
                  {student.specialization_names.join(", ")}
                </p>
              </div>

              {/* Links */}
              <div>
                {student.linkedin && (
                  <a href={student.linkedin} target="_blank" rel="">
                    LinkedIn
                  </a>
                )}
                {student.portfolio && (
                  <a href={student.portfolio} target="_blank" rel="">
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          ))
        ) : !isLoading && filteredStudents.length === 0 ? (
          <p>No students match your selected filters.</p>
        ) : null}
      </div>
    </div>
  );
};

export default FilteredStudents;
