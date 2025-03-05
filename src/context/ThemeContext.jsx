import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("document-dark");
        document.documentElement.classList.remove("document-light");
      } else {
        document.documentElement.classList.add("document-light");
        document.documentElement.classList.remove("document-dark");
      }
    },
    [isDarkMode]
  );

  function toggleTheme() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("ThemeContext was used outside of the theme provider");

  return context;
}
