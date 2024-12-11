import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles';

const PeriodSelector = ({ periods, selectedPeriod, setSelectedPeriod }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.periodContainer}>
      {periods.map((period) => {
        const isSelected = selectedPeriod === period.value;
        return (
          <Button
            key={period.value}
            mode={isSelected ? 'contained' : 'outlined'}
            onPress={() => setSelectedPeriod(period.value)}
            style={[
              styles.periodButton,
              isSelected && {
                backgroundColor: colors.primary,
                borderColor: colors.primary, // Ensure border matches background in 'contained' mode
              },
            ]}
            contentColor={isSelected ? colors.pr : colors.primary}
            labelStyle={{
              fontSize: 14,
              textAlign: 'center',
              color: isSelected ? colors.onPrimary : colors.primary,
            }}
          >
            {period.label}
          </Button>
        );
      })}
    </View>
  );
};

export default PeriodSelector;
