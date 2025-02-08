import React from 'react';
import { Button } from 'react-native';
import auth0 from '../../auth0config.js'; // import auth0 configuration
import { View } from 'react-native';

const LoginScreen = () => {
  const handleLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile',
      });
      console.log('Authenticated successfully', credentials);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View>
    <Button title="Login with Auth0" onPress={handleLogin} />

    </View>
  );
};

export default LoginScreen;