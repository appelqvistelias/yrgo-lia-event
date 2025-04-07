"use client"; // Marks this as a client-side component for Next.js

import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterDropDown.module.css";
import XIcon from "@/icons/x.svg";
import ArrowDownIcon from "@/icons/arrowdown.svg";

console.log("Styles:", styles);

// Component that creates a dropdown menu with checkboxes for filtering
// Props:
// - title: Text to display on the dropdown button
// - options: Array of objects with id and label properties
// - onFilterChange: Callback function that receives selected options
export default function FilterDropDown({ title, options, onFilterChange }) {
  // State for tracking if dropdown is open/closed
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null); // Ref for detecting clicks outside the dropdown

  // Toggle dropdown open/closed state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle checkbox selection/deselection
  const handleCheckboxChange = (optionId) => {
    let newSelectedOptions;

    // Remove option if already selected, add if not
    if (selectedOptions.includes(optionId)) {
      newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
    } else {
      newSelectedOptions = [...selectedOptions, optionId];
    }

    // Update local state and notify parent component
    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

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
          {title} {selectedOptions.length > 0 && `(${selectedOptions.length})`}
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
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
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
