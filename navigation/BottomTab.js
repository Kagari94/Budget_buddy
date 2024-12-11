import Home from '../screens/home/Home'
import InvestingHint from '../screens/investing_hint/InvestingHint'
import AddIncome from '../screens/income_expense/AddIncome'
import CurrencyConverter from '../screens/currency_converter/CurrencyConverter'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper';



const Tab = createMaterialBottomTabNavigator();

const HOME = 'Home';
const CURRENCY_CONVERT = 'Currency';
const INCOME_EXPENSE = 'Income';
const INVESTING_HINT = 'Investing';

const icons = {
  [HOME]: 'home',
  [INCOME_EXPENSE]: 'wallet-plus',
  [CURRENCY_CONVERT]: 'currency-eur',
  [INVESTING_HINT]: 'comment-question',
};

export default function BottomTab() {
  const { colors } = useTheme(); 

  return (
    <Tab.Navigator
      initialRouteName={HOME}
      backBehavior="history"
      activeColor={colors.primary} // Active icon color based on theme
      inactiveColor={colors.onSurfaceVariant || colors.onSurface} // Inactive icon color
      barStyle={{ backgroundColor: colors.surface }} // Tab bar background color
    >
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[HOME]} size={24} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={INCOME_EXPENSE}
        component={AddIncome}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[INCOME_EXPENSE]} size={24} color={color} />
          ),
          tabBarLabel: 'Income',
        }}
      />
      <Tab.Screen
        name={CURRENCY_CONVERT}
        component={CurrencyConverter}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[CURRENCY_CONVERT]} size={24} color={color} />
          ),
          tabBarLabel: 'Currency',
        }}
      />
      <Tab.Screen
        name={INVESTING_HINT}
        component={InvestingHint}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={icons[INVESTING_HINT]} size={24} color={color} />
          ),
          tabBarLabel: 'Investing',
        }}
      />
    </Tab.Navigator>
  );
}