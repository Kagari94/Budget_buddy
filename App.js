import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab from './navigation/BottomTab';


export default function App() {
  return (
    <View style={{flex: 1}}>{/*Bring the styles to own folders */}
      <BottomTab/>
    </View>
  );
}