// App.js
import React, { useContext, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { ThemeContext } from './context/ThemeContext';
import { LightTheme, DarkTheme } from './theme';


export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (

    <ThemeContext.Provider value={[isDarkTheme, setIsDarkTheme]}>
      <PaperProvider theme={isDarkTheme ? LightTheme : DarkTheme}>
        <StackNav />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
