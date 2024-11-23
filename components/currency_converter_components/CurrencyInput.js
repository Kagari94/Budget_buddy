import React from 'react';
import { TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles';

const CurrencyInput = ({ amount, setAmount }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      label="Enter Amount"
      mode="outlined"
      keyboardType="numeric"
      value={amount}
      onChangeText={setAmount}
      style={styles.input}
      left={<TextInput.Icon name="currency-usd" color={colors.onBackground} />}
      theme={{
        colors: {
          text: colors.onBackground,
          placeholder: colors.placeholder,
        },
      }}
    />
  );
};

export default CurrencyInput;
