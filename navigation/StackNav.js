import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomTab from "./BottomTab";
import Settings from '../screens/settings/Settings';
import { ThemeContext } from '../context/ThemeContext';

const Stack = createStackNavigator();

export default function StackNav() {
    const { theme } = React.useContext(ThemeContext);
    return(
        <NavigationContainer theme={theme}>
            <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={BottomTab}
                options={({ navigation }) => ({
                    headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <MaterialCommunityIcons name="cog" size={24} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    ),
                    headerTitle: 'Budget Buddy', 
                })}
        />
        <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
