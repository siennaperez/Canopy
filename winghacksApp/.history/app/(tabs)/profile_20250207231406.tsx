import React, { useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button, View, Text } from 'react-native';  // Native Button from react-native
import Auth0 from 'react-native-auth0';  // Import the react-native-auth0 library

// Create an Auth0 instance (Make sure to replace these with your actual credentials)
const auth0 = new Auth0({
  domain: 'dev-870lb37ryyy22qz7.us.auth0.com',
  clientId: 'k0jYDQ1Z1odSnNLk8Rz0kWCcvZVm0Q3u',
});

const TabTwoScreen = () => {
  const [authToken, setAuthToken] = useState(null);  // To hold the auth token after login
  const [userInfo, setUserInfo] = useState(null);    // To hold user data if needed

  const handleLogin = async () => {
    try {
      // Trigger the Auth0 login
      const credentials = await auth0.auth.authorize({
        scope: 'openid profile email',  // Include the scope to request user info
      });
      console.log('User credentials:', credentials);
      
      // If login is successful, set the token
      setAuthToken(credentials.accessToken);
      
      // Optionally, retrieve user info
      const user = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUserInfo(user);
      
    } catch (error) {
      console.error('Auth0 login error:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={{}} // Add styles if needed
        />
      }>
      <ThemedView style={{ padding: 20 }}>
        <ThemedText type="title">NAME</ThemedText>
      </ThemedView>

      <ThemedText>description</ThemedText>

      {/* Add your Login Button here */}
      <View style={{ padding: 20 }}>
        <Button title="Log in with Auth0" onPress={handleLogin} />
      </View>

      {/* Optionally show user info */}
      {userInfo && (
        <ThemedView style={{ marginTop: 20 }}>
          <ThemedText>User Info:</ThemedText>
          <ThemedText>{userInfo.name}</ThemedText>
          <ThemedText>{userInfo.email}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
};

export default TabTwoScreen;
