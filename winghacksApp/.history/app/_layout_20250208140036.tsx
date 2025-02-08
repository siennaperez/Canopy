import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './(login)/login';
import TabLayout from './(tabs)/_layout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const [loaded, setLoaded] = React.useState(false);
  //const { user } = useAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? "(tabs)" : "(login)"}>
            {!user ? (
              <Stack.Screen name="(login)" component={LoginScreen} />
            ) : (
              <Stack.Screen name="(tabs)" component={TabLayout} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppLayout;