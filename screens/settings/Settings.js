import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './style'; 

export default function Settings() {
  
  const [isDarkTheme, setIsDarkTheme] = useContext(ThemeContext);

  const { colors } = useTheme();

  return (
    
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Toggle Dark Mode</Text>
      <Switch
        value={isDarkTheme}
        onValueChange={() => setIsDarkTheme(!isDarkTheme)}
        color={colors.primary}
      />
    </View>
  );
}