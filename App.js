import React, { createContext, useState, useContext } from 'react';
import { PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { LightTheme, DarkTheme } from './theme';

export const ThemeContext = createContext();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Alustetaan teema-tila

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme); // Vaihdetaan teemaa
  };

  const theme = isDarkTheme ? DarkTheme : LightTheme; // Valitaan teema

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={theme}>
        <StackNav />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
