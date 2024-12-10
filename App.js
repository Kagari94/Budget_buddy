import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
            <StackNav />
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
