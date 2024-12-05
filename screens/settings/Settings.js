import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrencyPicker from '../../components/settings/CurrencyPicker';
import styles from './style';

export default function Settings() {

  const [currency, setCurrency] = useState(null);


  const handleCurrencySelect = (currency) => {
    console.log('Selected:', currency); 
    setCurrency(currency);
  };

  return (
    <View style={styles.container}>
      <Text>Here is basic Settings</Text>
      <Text>Select currency</Text>
      <CurrencyPicker onCurrencySelect={handleCurrencySelect} />



    </View>
  );
}