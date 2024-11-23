import React from 'react';
import { Card, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const ConversionResult = ({ amount, baseCurrency, convertedAmount, targetCurrency }) => {
  const { colors } = useTheme();

  return (
    <Card style={[styles.resultCard, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <Text style={[styles.result, { color: colors.primary }]}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ConversionResult;
