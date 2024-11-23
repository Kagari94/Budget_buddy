import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const ConvertButton = ({ handleConvert, loading }) => {
  return (
    <Button
      mode="contained"
      onPress={handleConvert}
      loading={loading}
      disabled={loading}
      style={styles.button}
    >
      Convert
    </Button>
  );
};

export default ConvertButton;
