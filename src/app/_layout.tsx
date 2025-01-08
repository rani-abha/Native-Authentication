import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { usePathname } from 'expo-router';

import AuthContextProvider from '../context/AuthContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
  
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const router = usePathname();
  useEffect(() => {
    console.log('Current route:', router);
  }, [router]);

  return (
    <>
      <AuthContextProvider>

            <ThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <Stack>
              <Stack.Screen
                  name="modal"
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                  name="index"
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="(auth)/signIn"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/signUp"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/authenticate"
                  options={{ title: 'Confirm' }}
                />
                
              </Stack>
            </ThemeProvider>
      </AuthContextProvider>
    </>
  );
}