import Home from '../screens/home/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const HOME = 'Home';
//Here all the other screens

const icons = {
  [HOME]: 'home'
  //Icons here
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

      </Tab.Navigator>
    </NavigationContainer>
  );
}