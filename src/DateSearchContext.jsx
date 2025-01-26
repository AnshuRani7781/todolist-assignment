import React, { createContext, useContext, useState } from "react";

// Create a context
const DateSearchContext = createContext();

// Helper function to format the date as dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Provider component
export const DateSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const updateSearchTerm = (term) => setSearchTerm(term);

  const updateSelectedDate = (date) => {
    // If date is in yyyy-mm-dd format, we convert it to dd/mm/yyyy
    const formattedDate = date ? formatDate(date) : "";
    setSelectedDate(formattedDate);
  };

  return (
    <DateSearchContext.Provider
      value={{
        searchTerm,
        selectedDate,
        updateSearchTerm,
        updateSelectedDate,
      }}
    >
      {children}
    </DateSearchContext.Provider>
  );
};

// Custom hook to use the context
export const useDateSearch = () => useContext(DateSearchContext);
