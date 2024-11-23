import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles';

const PeriodSelector = ({ periods, selectedPeriod, setSelectedPeriod }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.periodContainer}>
      {periods.map((period) => (
        <Button
          key={period.value}
          mode={selectedPeriod === period.value ? 'contained' : 'outlined'}
          onPress={() => setSelectedPeriod(period.value)}
          style={[
            styles.periodButton,
            selectedPeriod === period.value && {
              backgroundColor: colors.primary,
            },
          ]}
          labelStyle={{
            fontSize: 14,
            textAlign: 'center',
            color:
              selectedPeriod === period.value
                ? colors.onPrimary
                : colors.primary,
          }}
        >
          {period.label}
        </Button>
      ))}
    </View>
  );
};

export default PeriodSelector;
