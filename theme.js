
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Custom Light Theme
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',      // Purple
    onPrimary: '#000000',    // White (text on primary)
    background: '#ffffff',   // White
    onBackground: '#000000', // Black
    surface: '#f6f6f6',      // Light gray for surfaces
    onSurface: '#000000',    // Black
    error: '#B00020',        // Red
    onError: '#ffffff',      // White
  },
};

// Custom Dark Theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',      // Light Purple
    onPrimary: '#ffffff',    // white (text on primary)
    background: '#121212',   // Very dark gray
    onBackground: '#ffffff', // White
    surface: '#1e1e1e',      // Dark gray for surfaces
    onSurface: '#ffffff',    // White
    error: '#cf6679',        // Light red
    onError: '#000000',      // Black
  },
};
