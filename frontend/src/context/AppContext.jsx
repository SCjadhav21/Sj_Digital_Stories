import React, { useState, createContext } from "react";

export const AddContext = createContext();

const ContextProvider = ({ children }) => {
  const [refresh, setrefresh] = useState(false);

  const value = { refresh, setrefresh };
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export default ContextProvider;
