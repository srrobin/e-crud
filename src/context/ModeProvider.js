/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from "react";

const ModeContext = createContext();
export const themeMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode") === "dark");

  const toggleMode = () => {
    const updateMode = !mode;
    setMode(updateMode);
    localStorage.setItem("mode", updateMode ? "dark" : "light");
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
