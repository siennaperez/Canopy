import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native'; // Import View from react-native

import { useAuth0 } from 'react-native-auth0';  // Import the Auth0 hook

import dotenv from 'dotenv';
dotenv.config(); // Load .env file

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [authToken, setAuthToken] = useState(null); 

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Use the Auth0 hook
  const { authorize, user } = useAuth0();

  // Function to log in using Auth0
  const handleLogin = async () => {
    try {
      const credentials = await authorize();
      console.log('Credentials:', credentials); // Log the credentials to inspect their structure
      
      // Check if accessToken exists in credentials
      if (credentials && credentials.accessToken) {
        setAuthToken(credentials.accessToken);
      } else {
        console.error('Access token is missing.');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
      <StatusBar style="auto" />
    </View>
  );
}
