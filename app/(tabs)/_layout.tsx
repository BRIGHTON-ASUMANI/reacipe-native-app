import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { FoodThemeColors } from '../color';

const tabBarStyles = {
  light: {
    position: 'absolute',
    backgroundColor: FoodThemeColors.neutral.light.tabBar,
    borderTopWidth: 1,
    borderTopColor: FoodThemeColors.neutral.light.border,
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
  },
  dark: {
    position: 'absolute',
    backgroundColor: FoodThemeColors.neutral.dark.tabBar,
    borderTopWidth: 1,
    borderTopColor: FoodThemeColors.neutral.dark.border,
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
  },
} as const;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FoodThemeColors.primary[isDark ? 'light' : 'main'],
        tabBarInactiveTintColor: isDark 
          ? FoodThemeColors.neutral.dark.text + '80'
          : FoodThemeColors.neutral.light.text + '80',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: tabBarStyles[isDark ? 'dark' : 'light'],
          default: tabBarStyles[isDark ? 'dark' : 'light'],
        }),
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 12,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="preference"
        options={{
          title: 'Preferences',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}