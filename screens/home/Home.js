import { Text, View } from 'react-native';
import ExpensesList from '../../components/expenses_list/ExpensesList';
import ExpensesChart from '../../components/expenses_chart/ExpensesChart';
import ButtonGroup from '../../components/button_group/ButtonGroup';
import { styles } from './style';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.budgettext}>Budget</Text>
      <View style={styles.expensechart}>
        <ExpensesChart />
      </View>
      <View style={styles.buttongroup}>
        <ButtonGroup/>
      </View>
      <View style={styles.expenselist}>
        <ExpensesList />
      </View>


    </View>
  );
}