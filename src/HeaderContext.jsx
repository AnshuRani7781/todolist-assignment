/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useCallback } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerContent, setHeaderContentState] = useState({
    heading: "TODO APP",
    icon: null,
  });

  // Memoize the setHeaderContent function
  const setHeaderContent = useCallback((newContent) => {
    setHeaderContentState(newContent);
  }, []);

  return (
    <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
