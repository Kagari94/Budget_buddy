import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../income_expense/style'
import Expenses from '../../components/income_expense/Expenses';
import Income from '../../components/income_expense/Income';

const AddIncome = () => {
  const [component, setComponent] = useState();

  //Valitaan näytetäänkö Income.js vai Expenses.js
  const renderComponent = () => {
    if(component === 'Income'){
      return <Income setComponent={setComponent}/>;
    }else if(component === 'Expenses'){
      return <Expenses setComponent={setComponent}/>;
    }
    return null;
  };


  return(
    <View style={styles.container}>

      

    {component ? ( 
    renderComponent() ) : (

      <View >
        <View>
          <Text style={styles.text}>ADD INCOME OR EXPENSE</Text>
        </View>
        <View style={styles.buttonRow}>
          <IconButton
            icon="plus"
            size={86}
            onPress={() => setComponent('Income')}
            iconColor='green'
          />
          <IconButton
            icon="minus"
            size={86}
            onPress={() => setComponent('Expenses')}
            iconColor='red'
          />
        </View>
      </View>
     )}

    </View>
  )
}

export default AddIncome;