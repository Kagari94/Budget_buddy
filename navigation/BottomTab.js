import Home from '../screens/home/Home'
import Settings from '../screens/settings/Settings'
import InvestingHint from '../screens/investing_hint/InvestingHint'
import AddIncome from '../screens/income_expense/AddIncome'
import CurrencyConverter from '../screens/currency_converter/CurrencyConverter'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const HOME = 'Home';
const CURRENCY_CONVERT = 'Currency';
const INCOME_EXPENSE = 'Income';
const INVESTING_HINT = 'investing';
const SETTINGS = 'Settings'

const icons = {
  [HOME]: 'home',
  [INCOME_EXPENSE]: 'wallet-plus',
  [CURRENCY_CONVERT]: 'currency-eur',
  [INVESTING_HINT]: 'comment-question',//This icon is a placeholder!
  [SETTINGS]: 'cog'
}

export default function BottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={HOME}
          component={Home}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[HOME]} size={20}/>}}
          />
          <Tab.Screen
          name={INCOME_EXPENSE}
          component={AddIncome}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[INCOME_EXPENSE]} size={20}/>}}
          />
          <Tab.Screen
          name={CURRENCY_CONVERT}
          component={CurrencyConverter}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[CURRENCY_CONVERT]} size={20}/>}}
          />
          <Tab.Screen
          name={INVESTING_HINT}
          component={InvestingHint}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[INVESTING_HINT]} size={20}/>}}
          />

      </Tab.Navigator>
    </NavigationContainer>
  );
}