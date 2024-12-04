import { Text, View } from 'react-native';
import ExpensesList from '../../components/expenses_list/ExpensesList';
import ExpensesChart from '../../components/expenses_chart/ExpensesChart';
import ButtonGroup from '../../components/button_group/ButtonGroup';
import { SelectedID } from '../../context/sortingContext'
import { styles } from './style';
import { useState } from 'react';


export default function Home() {

  const [selectedId, setSelectedId] = useState('All');//Bring this to conext

  return (
    <View style={styles.container}>
      <Text style={styles.budgettext}>Budget</Text>
      <View style={styles.expensechart}>
        <ExpensesChart />
      </View>
      <SelectedID.Provider value={[selectedId, setSelectedId]}>
        <View style={styles.buttongroup}>
          <ButtonGroup />
        </View>
        <View style={styles.expenselist}>
          <ExpensesList />
        </View>
      </SelectedID.Provider>

    </View>
  );
}