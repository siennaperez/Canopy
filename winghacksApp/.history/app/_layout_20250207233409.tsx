import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native'; // Import View from react-native

import { loginWithAuth0, logoutWithAuth0 } from '../backend/auth0';  // Import the Auth0 service
import {useAuth0} from 'react-native-auth0';
import { Auth0Provider } from '@auth0/auth0-react'; 
import Constants from 'expo-constants'; 


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

  return (
    <Auth0Provider 
      domain={Constants.manifest.extra.auth0Domain} 
      clientId={Constants.manifest.extra.auth0ClientId}
    >
      <View style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
        <StatusBar style="auto" />
      </View>
    </Auth0Provider>
  );
}
