import { I18nextProvider } from 'react-i18next';
import i18n from '@/assets/i18n/config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LocationProvider } from '@/contexts/location';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
    <I18nextProvider i18n={i18n}>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={DefaultTheme}>
          <LocationProvider>
            <Stack
              initialRouteName='/'
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(open)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </LocationProvider>
        </ThemeProvider>
      </GluestackUIProvider>
    </I18nextProvider>
  );
}
