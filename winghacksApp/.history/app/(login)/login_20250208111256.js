import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useAuth } from "../../context/AuthContext";
import React from 'react';
import { Button } from 'react-native';
import auth0 from 'auth0config.js'; // import auth0 configuration

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
    <Button title="Login with Auth0" onPress={handleLogin} />
  );
};

export default LoginScreen;