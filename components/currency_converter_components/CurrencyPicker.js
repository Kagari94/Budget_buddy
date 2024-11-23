import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { IconButton, useTheme } from 'react-native-paper';
import pickerSelectStyles from '../../screens/currency_converter/pickerStyles.js';

const CurrencyPicker = ({ value, onValueChange, items, placeholder }) => {
  const { colors } = useTheme();

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

  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      items={items}
      value={value}
      style={customizedPickerStyles}
      placeholder={placeholder}
      Icon={() => (
        <IconButton icon="chevron-down" size={24} color={colors.onBackground} />
      )}
    />
  );
};

export default CurrencyPicker;
