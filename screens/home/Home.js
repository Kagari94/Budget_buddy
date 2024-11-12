import { StyleSheet, Text, View } from 'react-native';
import ExpensesList from '../../components/ExpensesList';


export default function App() {
  return (
    <View style={{flex: 1}}>
      <Text>Here is basic Home screen</Text>

      <ExpensesList/>

    </View>
  );
}