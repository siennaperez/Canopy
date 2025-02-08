import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>logo</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#666"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.buttonText}>Create new account</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B5D1C9',
  },
  container: {
    flex: 1,
    backgroundColor: '#B5D1C9',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: '#E8E8E8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#666',
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
