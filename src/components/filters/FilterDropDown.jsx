"use client"; // Marks this as a client-side component for Next.js

import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterDropDown.module.css";
import XIcon from "@/icons/x.svg";
import ArrowDownIcon from "@/icons/arrowdown.svg";
import { formatLabel } from "../../utils/formatLabel";

// Component that creates a dropdown menu with checkboxes for filtering
// Props:
// - title: Text to display on the dropdown button
// - options: Array of objects with id and label properties
// - onFilterChange: Callback function that receives selected options
export default function FilterDropDown({ title, options, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  // Separate states for each category
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const dropdownRef = useRef(null); // Ref for detecting clicks outside the dropdown

  // Toggle dropdown open/closed state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Updated handleCheckboxChange
  const handleCheckboxChange = (optionId, category) => {
    if (category === "Program") {
      const newSelected = selectedPrograms.includes(optionId)
        ? selectedPrograms.filter((id) => id !== optionId)
        : [...selectedPrograms, optionId];
      setSelectedPrograms(newSelected);
      onFilterChange(newSelected, category);
    } else if (category === "Inriktning") {
      const newSelected = selectedSpecializations.includes(optionId)
        ? selectedSpecializations.filter((id) => id !== optionId)
        : [...selectedSpecializations, optionId];
      setSelectedSpecializations(newSelected);
      onFilterChange(newSelected, category);
    }
  };

  // Calculate total number of selected options
  const totalSelected =
    selectedPrograms.length + selectedSpecializations.length;

  // Effect for handling clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click is outside the dropdown element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Only add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {/* Dropdown button showing title and number of selected items */}
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={toggleDropdown}
      >
        <span className={styles.buttonText}>
          {title} {totalSelected > 0 && `(${totalSelected})`}
        </span>
        {isOpen ? (
          <XIcon className={styles.icon} />
        ) : (
          <ArrowDownIcon className={styles.icon} />
        )}
      </button>

      {/* Dropdown menu - only shown when isOpen is true */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownContent}>
            {options.map((category) => (
              <div key={category.category} className={styles.category}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                {category.options.map((option) => (
                  <div key={option.id} className={styles.optionItem}>
                    <input
                      id={`filter-${option.id}`}
                      type="checkbox"
                      className={styles.checkbox}
                      checked={
                        category.category === "Program"
                          ? selectedPrograms.includes(option.id)
                          : selectedSpecializations.includes(option.id)
                      }
                      onChange={() =>
                        handleCheckboxChange(option.id, category.category)
                      }
                    />
                    <label
                      htmlFor={`filter-${option.id}`}
                      className={styles.optionLabel}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
