// navigation/BottomTab.js
import React from 'react';
import { useTheme } from 'react-native-paper';
import Home from '../screens/home/Home';
import InvestingHint from '../screens/investing_hint/InvestingHint';
import AddIncome from '../screens/income_expense/AddIncome';
import CurrencyConverter from '../screens/currency_converter/CurrencyConverter';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const HOME = 'Home';
const CURRENCY_CONVERT = 'Currency';
const INCOME_EXPENSE = 'Income';
const INVESTING_HINT = 'Investing';
const SETTINGS = 'Settings';

const icons = {
  [HOME]: 'home',
  [INCOME_EXPENSE]: 'wallet-plus',
  [CURRENCY_CONVERT]: 'currency-eur',
  [INVESTING_HINT]: 'comment-question', // Placeholder-ikoni
  [SETTINGS]: 'cog',
};

export default function BottomTab() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={HOME}
      backBehavior="history"
      barStyle={{ backgroundColor: colors.surface }} // Käytä surface väriä taustalle
      activeColor={colors.primary} // Aktiivinen väri
      inactiveColor={colors.onSurface} // Ei-aktiivinen väri
    >
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[HOME]} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={INCOME_EXPENSE}
        component={AddIncome}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[INCOME_EXPENSE]} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={CURRENCY_CONVERT}
        component={CurrencyConverter}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[CURRENCY_CONVERT]} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={INVESTING_HINT}
        component={InvestingHint}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[INVESTING_HINT]} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
