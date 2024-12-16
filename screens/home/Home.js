import { Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ExpensesList from '../../components/expenses_list/ExpensesList';
import ExpensesChart from '../../components/expenses_chart/ExpensesChart';
import ButtonGroup from '../../components/button_group/ButtonGroup';
import { SelectedID } from '../../context/sortingContext'
import { styles } from './style';
import { useState } from 'react';
import AddBudget from '../../components/add_budget/AddBudget';


export default function Home() {

  const [selectedId, setSelectedId] = useState('All');//Bring this to conext

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.expensechart}>
        <ExpensesChart />
      </View>
      <SelectedID.Provider value={[selectedId, setSelectedId]}>
        <View style={styles.buttongroup}>
          <ButtonGroup />
        </View>
        <View>
          <AddBudget/>
        </View>
        <View style={styles.expenselist}>
          <ExpensesList />
        </View>
      </SelectedID.Provider>

    </SafeAreaView></SafeAreaProvider>
  );
}