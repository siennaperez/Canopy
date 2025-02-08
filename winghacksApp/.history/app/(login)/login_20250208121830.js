import React from 'react';
import { Button, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext";
import { ThemedView } from '@/components/ThemedView';

const LoginScreen = () => {
  //const { login } = useAuth();

  return (
    <ThemedView>
    <Text>LOGIN PAGE SHOW HERE</Text>
    {/* <Button title="Login with Auth0" onPress={login} /> */}
    </ThemedView>

  );
};

export default LoginScreen;
