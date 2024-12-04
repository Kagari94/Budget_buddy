// components/currency_converter_components/SwapButton.js
import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const SwapButton = ({ swapCurrencies }) => {
  const { colors } = useTheme(); // Access theme colors

  return (
    <Button
      mode="contained"
      onPress={swapCurrencies}
      icon="swap-horizontal"
      style={[styles.swapButton, { backgroundColor: colors.primary }]}
      labelStyle={{ color: colors.onPrimary }} // Set text color
      contentStyle={{ flexDirection: 'row-reverse' }}
    >
      Swap
    </Button>
  );
};

export default SwapButton;
