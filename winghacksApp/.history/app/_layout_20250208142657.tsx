import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Stack from '@react-navigation/native-stack';
import { useEffect } from 'react';
import 'react-native-reanimated';

import LoginScreen from './(login)/login';
import TabLayout from './(tabs)/_layout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout (){

  const colorScheme = useColorScheme ();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  }); 

  useEffect(() => {
    if (loaded){
      SplashScreen.hideAsync();
  }
  }, [loaded]);

if (!loaded){
  return null;
}

return (
  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="(tabs)" component={TabLayout} />
      <Stack.Screen name="+not-found" />
    </Stack>
    <StatusBar style="auto" />
  </ThemeProvider>
    

  );
}