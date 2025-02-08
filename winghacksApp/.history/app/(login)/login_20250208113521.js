import React from 'react';
import { Button, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <Text>Welcome to My App</Text>
    <Button title="Login with Auth0" onPress={login} />
  );
};

export default LoginScreen;
