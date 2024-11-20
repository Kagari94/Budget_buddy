import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import StackNav from './navigation/StackNav';


export default function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>{/*Get a boolean for changing Dark to light */}
      <StackNav/> 
    </PaperProvider>
  );
}