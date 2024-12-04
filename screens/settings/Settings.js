import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../../App'; 
import { useTheme } from 'react-native-paper';
import styles from './style';

const Settings = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text}}>
        Theme selector
      </Text>
      <Switch
        value={isDarkTheme}
        onValueChange={toggleTheme}
        thumbColor={isDarkTheme ? colors.primary : '#f4f3f4'}
        trackColor={{ false: '#767577', true: colors.primary }}
      />
    </View>
  );
};



export default Settings;
