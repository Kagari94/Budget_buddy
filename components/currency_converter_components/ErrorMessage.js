import React from 'react';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const ErrorMessage = ({ error }) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles.errorText, { color: colors.error }]}>
      {error}
    </Text>
  );
};

export default ErrorMessage;
