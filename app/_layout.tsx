import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

import { LocationProvider } from '@/contexts/location';
import { QueryClient, QueryClientProvider } from 'react-query';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  }
});

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useReactQueryDevTools(queryClient);

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
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
