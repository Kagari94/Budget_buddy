// components/currency_converter_components/ConvertButton.js
import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const ConvertButton = ({ handleConvert, loading }) => {
  const { colors } = useTheme(); // Access theme colors

  return (
    <Button
      mode="contained"
      onPress={handleConvert}
      loading={loading}
      disabled={loading}
      style={[styles.button, { backgroundColor: colors.primary }]}
      labelStyle={{ color: colors.onPrimary }} // Set text color
    >
      Convert
    </Button>
  );
};

export default ConvertButton;
