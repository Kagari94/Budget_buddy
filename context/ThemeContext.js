import React, { createContext, useState } from 'react';
import { LightTheme, DarkTheme } from '../theme'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Alustetaan teema-tila

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme); // Vaihdetaan teemaa
  };

  const theme = isDarkTheme ? DarkTheme : LightTheme; // Valitaan teema tilan perusteella

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
