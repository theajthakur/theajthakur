import React, { createContext, useState, useContext } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "night" : "light"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
