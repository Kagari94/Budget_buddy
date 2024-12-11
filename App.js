import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';
import { CurrencyProvider } from './context/currencyContext';


export default function App() {
  return (
    <CurrencyProvider>
      <PaperProvider theme={MD3LightTheme}>{/*Get a boolean for changing Dark to light */}
        <StackNav/> 
      </PaperProvider>
    </CurrencyProvider>
  );
}