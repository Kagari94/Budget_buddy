import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import pickerSelectStyles from '../../screens/currency_converter/pickerStyles.js';



const CurrencyPicker = ({ onCurrencySelect, onResetApp }) => {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const { colors } = useTheme();
    const isFirstSelection = useRef(true);

    const chosenCurrencies = [
      'usd', 'eur', 'jpy', 'gbp', 'aud', 'cad', 'chf', 'cny', 'hkd', 'nzd',
      'sek', 'krw', 'sgd', 'nok', 'inr', 'mxn', 'brl', 'zar', 'try', 'rub',
    ];
  


    useEffect(() => {
  
    const fetchCurrencies = async () => {
        try {
          const response = await axios.get(
            'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
          );
          //console.log('Raw API response:', response.data);
          const data = response.data;
          
          const filteredCurrencies = chosenCurrencies.map((currency) => ({
            label: data[currency] ? `${data[currency]} (${currency.toUpperCase()})` : currency.toUpperCase(),
            value: currency,
          }));
          //console.log('Formatted currencies before setting state:', formattedCurrencies);

          setCurrencies(filteredCurrencies);
        } catch (error) {
          console.error('Error fetching currencies:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCurrencies();
    }, []);
  
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading currencies...</Text>
        </View>
      );
    }

    const customizedPickerStyles = {
      ...pickerSelectStyles,
      iconContainer: {
        top: 15,
        right: 10,
      },
      inputIOS: {
        ...pickerSelectStyles.inputIOS,
        color: colors.onBackground,
        backgroundColor: colors.surface,
        borderColor: colors.placeholder || "#888888",
        paddingLeft: 60,
      },
      inputAndroid: {
        ...pickerSelectStyles.inputAndroid,
        color: colors.onBackground,
        backgroundColor: colors.surface,
        borderColor: colors.placeholder || "#888888",
        paddingLeft: 60,
      },
    };

    const handleCurrencyChange = (value) => {
      if(isFirstSelection.current){
        isFirstSelection.current = false;
        setSelectedCurrency(value);
        onCurrencySelect(value);
      }else if(onResetApp){
        Alert.alert('Change default currency',
          'Changing the currency will reset the app.',
          [
            {text:'Cancel', style: 'cancel'},
            {text:'Reset',style:'destructive',
              onPress: ()=>{
                console.log('App reset');
                onResetApp();
                setSelectedCurrency(value);
                onCurrencySelect(value);  
              },
            },
          ]
        );
      }
    };
  

   
  
    return (
       <View style={styles.container}> 
        <RNPickerSelect
          onValueChange={handleCurrencyChange}
          items={currencies}
          style={customizedPickerStyles}
          value={selectedCurrency}
          placeholder={{
            label: 'Select Currency...',
            
          }}
          Icon={() => (
            <IconButton icon="chevron-down" size={24} color={colors.onBackground} />
          )}
        />
        
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      margin: 10
    },


  });

  export default CurrencyPicker;