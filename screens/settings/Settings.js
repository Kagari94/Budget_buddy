import React, { useState, useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from 'react-native-paper';
import CurrencyPicker from '../../components/settings/CurrencyPicker';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './style';

export default function Settings() {
  const [currency, setCurrency] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const handleCurrencySelect = (selectedCurrency) => {
    console.log('Selected:', selectedCurrency);
    setCurrency(selectedCurrency);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Dark Mode Toggle at the Top */}
      <Text style={{ color: colors.onBackground, fontSize: 18, marginBottom: 10 }}>
        App Theme
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: colors.onBackground, marginRight: 10 }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Currency Section Below */}
      <Text style={{ color: colors.onBackground, fontSize: 18, marginBottom: 10 }}>
        Select Currency
      </Text>
      <CurrencyPicker onCurrencySelect={handleCurrencySelect} />
    </View>
  );
}
