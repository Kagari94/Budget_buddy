import Home from '../screens/home/Home'
import InvestingHint from '../screens/investing_hint/InvestingHint'
import AddIncome from '../screens/income_expense/AddIncome'
import CurrencyConverter from '../screens/currency_converter/CurrencyConverter'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


const Tab = createMaterialBottomTabNavigator();

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

export default function BottomTab() {//Something causes a warning (Warning: A props object containing a "key" prop is being spread into JSX:)

  return (
    
      <Tab.Navigator
        initialRouteName={HOME}
        backBehavior="history"
      >
        <Tab.Screen
          name={HOME}
          component={Home}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[HOME]} size={20} color={"white"}/>}}//Add dark and light themeing!
          />
          <Tab.Screen
          name={INCOME_EXPENSE}
          component={AddIncome}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[INCOME_EXPENSE]} size={20} color={"white"}/>}}
          />
          <Tab.Screen
          name={CURRENCY_CONVERT}
          component={CurrencyConverter}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[CURRENCY_CONVERT]} size={20} color={"white"}/>}}
          />
          <Tab.Screen
          name={INVESTING_HINT}
          component={InvestingHint}
          options={{tabBarIcon: ()=> <MaterialCommunityIcons name={icons[INVESTING_HINT]} size={20} color={"white"}/>}}
          />

      </Tab.Navigator>
    
  );
}