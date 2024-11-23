import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const SwapButton = ({ swapCurrencies }) => {
  return (
    <Button
      mode="contained"
      onPress={swapCurrencies}
      icon="swap-horizontal"
      style={styles.swapButton}
      contentStyle={{ flexDirection: "row-reverse" }}
    >
      Swap
    </Button>
  );
};

export default SwapButton;
