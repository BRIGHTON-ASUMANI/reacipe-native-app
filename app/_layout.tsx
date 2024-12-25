// RootLayout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FoodThemeColors } from './color';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: FoodThemeColors.primary.main,
    background: FoodThemeColors.neutral.light.background,
    card: FoodThemeColors.neutral.light.card,
    text: FoodThemeColors.neutral.light.text,
    border: FoodThemeColors.neutral.light.border,
    notification: FoodThemeColors.status.error,
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: FoodThemeColors.primary.light,
    background: FoodThemeColors.neutral.dark.background,
    card: FoodThemeColors.neutral.dark.card,
    text: FoodThemeColors.neutral.dark.text,
    border: FoodThemeColors.neutral.dark.border,
    notification: FoodThemeColors.status.error,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' 
              ? FoodThemeColors.neutral.dark.background 
              : FoodThemeColors.neutral.light.background,
          },
          headerTintColor: colorScheme === 'dark'
            ? FoodThemeColors.neutral.dark.text
            : FoodThemeColors.neutral.light.text,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
