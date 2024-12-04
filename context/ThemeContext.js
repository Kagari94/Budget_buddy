import React, { createContext, useState } from 'react';
import { LightTheme, DarkTheme } from '../theme'; // Import themes from theme.js

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Initial theme is light

  const theme = isDarkTheme ? DarkTheme : LightTheme; // Choose theme based on state

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); // Toggle between light and dark themes
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
