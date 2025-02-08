import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo-splash-screen';
//import { AuthProvider } from '../../context/AuthContext'; // Update the path as needed
import { ThemeProvider } from '@/components/ThemeProvider'; // Update the path as needed
import LoginScreen from '../(login)/login'; // Update the path as needed
import { DarkTheme, DefaultTheme } from '@/themes'; // Update the path as needed

const Stack = createStackNavigator();

const AppLayout = () => {
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