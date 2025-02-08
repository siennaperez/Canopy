import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import LoginScreen from './(login)/login';
import TabLayout from './(tabs)/_layout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';



//import { AuthProvider, useAuth, user } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  const colorScheme = useColorScheme();

  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    //<AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="(login)">
            <Stack.Screen name="(login)" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ThemeProvider>
    //</AuthProvider>
  );
};

export default AppLayout;