import React from 'react';
import { Button, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <View>
    <Text>Welcome to My App</Text>
    <Button title="Login with Auth0" onPress={login} />
    </View>

  );
};

export default LoginScreen;
