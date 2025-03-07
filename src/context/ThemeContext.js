import React, { createContext, useState, useContext } from "react";

// Create Context
const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
  const [slide, setSlide] = useState("true");  // ✅ Corrected variable name

  const toggleTheme = () => {
    setSlide((prevSlide) => (prevSlide === "true" ? "false" : "true"));
  };

  return (
    <ThemeContext.Provider value={{ slide, toggleTheme }}>  {/* ✅ Fixed */}
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use context
export const useTheme = () => useContext(ThemeContext);
