// App.js
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

function Main() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <PaperProvider theme={theme}>
      <StackNav />
    </PaperProvider>
  );
}
