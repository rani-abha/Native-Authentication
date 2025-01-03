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
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/signIn',
};
// SplashScreen.preventAutoHideAsync();

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
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {/* {!loaded && <SplashScreen />} */}
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
        {/* <TweetsApiContextProvider> */}
          {/* <QueryClientProvider client={client}> */}
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
          {/* </QueryClientProvider> */}
        {/* </TweetsApiContextProvider> */}
      </AuthContextProvider>
    </>
  );
}