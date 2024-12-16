import React, { useContext, useState } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import CurrencyPicker from '../../components/settings/CurrencyPicker';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './style';
import { useCurrency } from '../../context/currencyContext';
import { clearStorage } from '../../components/settings/ResetApp';

export default function Settings() {
  const { setCurrency } = useCurrency();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const { currency: settingsCurrency } = useCurrency();

  const handleCurrencySelect = (selectedCurrency) => {
    console.log('Selected:', selectedCurrency);
    setCurrency(selectedCurrency);
  };

  const handleResetApp = () => {
    Alert.alert('Change default currency',
              'Changing the currency will reset the app.',
              [
                {text:'Cancel', style: 'cancel'},
                {text:'Reset',style:'destructive',
                  onPress: async ()=>{
                    await clearStorage();
                    console.log('reset');
                    
                  },
                },
              ]
            );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.onBackground, fontSize: 18, marginBottom: 10 }}>
        App Theme
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: colors.onBackground, marginRight: 10 }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <Text style={{ color: colors.onBackground, fontSize: 18, marginBottom: 10 }}>
        Select Currency
      </Text>
      <CurrencyPicker onCurrencySelect={handleCurrencySelect} onResetApp={handleResetApp}
      />
      <Text style={{ color: colors.onBackground, fontSize: 18, marginBottom: 10 }}>
      Current Currency: {settingsCurrency || "No currency selected"}
      </Text>
    </View>
  );
}
