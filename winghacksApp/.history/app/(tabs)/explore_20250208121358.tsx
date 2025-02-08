import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from "react-native";
import { routeToScreen } from 'expo-router/build/useScreens';
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "expo-router";

import { useRouter } from 'expo-router';

export default function MessageScreen() {
  const router = useRouter();  // Call the hook at the top level of the component

  const routeToLogin = () => {
    router.push('/(login)/login');  // Use the router inside your function
  };

  return (
    <Button
      title="Login explore redirect to login page"
      onPress={routeToLogin}  // Call the routeToLogin function onPress
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

//export default MessageScreen;
