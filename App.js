import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './navigation/StackNav';


export default function App() {
  return (
    <View style={{flex: 1}}>{/*Bring the styles to own folders */}
      <StackNav/> 
    </View>
  );
}