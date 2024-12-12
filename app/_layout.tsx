import { I18nextProvider } from 'react-i18next';
import i18n from '@/assets/i18n/config';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { LocationProvider } from '@/contexts/location';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
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
    <GluestackUIProvider mode={'dark'}>
      <ThemeProvider value={DefaultTheme}>
        <LocationProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'flip',
            }}
          >
            <Stack.Screen name="(open)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </LocationProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
