// HomeNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import HomeScreen from '@/screens/HomeScreen';
import RecipeDetailsScreen from '@/screens/RecipeDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
