// navigation/StackNav.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomTab from './BottomTab';
import Settings from '../screens/settings/Settings';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator();

export default function StackNav() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
        }}
      >
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons
                  name="cog"
                  size={24}
                  style={{ marginRight: 10 }}
                  color={colors.onPrimary}
                />
              </TouchableOpacity>
            ),
            headerTitle: 'Budget Buddy',
          })}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
