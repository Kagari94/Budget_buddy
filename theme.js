// theme.js
import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';

export const LightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#6200ee',    // Purple
    onPrimary: '#ffffff',  // White text on primary color
    accent: '#03dac4',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    chartColors: ['#6200ee', '#03dac4', '#bb86fc', '#3700b3', '#03dac5', '#018786', '#0000ff', '#00ff00'],
    bottomTab: '#f0f0f0',    // Light gray for light mode
    onBottomTab: '#000000',  // Black text/icons on bottom tab
  },
};

export const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#bb86fc',    // Light purple
    onPrimary: '#ffffff',  // White text on primary color 
    accent: '#03dac4',
    background: '#121212',
    surface: '#121212',
    text: '#ffffff',
    chartColors: ['#bb86fc', '#03dac5', '#6200ee', '#03dac4', '#3700b3', '#018786', '#ff0000', '#ffff00'],
    bottomTab: '#1f1f1f',    // Dark gray for dark mode
    onBottomTab: '#ffffff',  // White text/icons on bottom tab

  },
};
