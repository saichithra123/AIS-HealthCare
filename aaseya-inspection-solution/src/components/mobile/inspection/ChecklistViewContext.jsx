import React, { createContext, useState, useContext } from 'react';

const ChecklistContext = createContext();

export const useChecklist = () => useContext(ChecklistContext);

export const ChecklistProvider = ({ children }) => {
  const [showChecklist, setShowChecklist] = useState(false);

  return (
    <ChecklistContext.Provider value={{ showChecklist, setShowChecklist }}>
      {children}
    </ChecklistContext.Provider>
  );
};
