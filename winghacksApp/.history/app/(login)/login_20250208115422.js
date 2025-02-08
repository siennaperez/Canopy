import React from 'react';
import { Button, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  //const { login } = useAuth();

  return (
    <ThemedView>
    <Text>LOGIN PAGE HERE</Text>
    <Button title="Login.js" onPress={login} />
    </ThemedView>

  );
};

export default LoginScreen;
