import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme'; //

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <StackNav />
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
