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
    <View>
      

    {component ? ( 
    renderComponent() ) : (
      <View style={styles.container}>

        <Text style={styles.text}>Add expense or income</Text>
        
        <View style={styles.buttonRow}>
          <IconButton
            icon="plus"
            size={64}
            onPress={() => setComponent('Income')}
          />
          <IconButton
            icon="minus"
            size={64}
            onPress={() => setComponent('Expenses')}
          />
        </View>
      </View>
     )}

    </View>
  )
}

export default AddIncome;