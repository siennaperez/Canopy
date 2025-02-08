import React from 'react';
import { Button, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen () {
  //const { login } = useAuth();

  return (
    <ThemedView>
    <Text>LOGIN PAGE HERE</Text>
    <Button title="Login.js" onPress={login} />
    </ThemedView>

  );
};

