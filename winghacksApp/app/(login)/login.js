import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Image } from 'react-native';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }


    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to log in');
    } 
  };

  const handleCreateAccount = () => {
    router.push('/(login)/create-account');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={require('../../assets/images/logo_clear.png')} style={styles.logopic} />
          <Text style={styles.canopyText}>
              Canopy
            </Text>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!loading}
            />

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Log in'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.createAccountButton, loading && styles.buttonDisabled]}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Create new account
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#CDE2D0',
  },
  container: {
    flex: 1,
    backgroundColor: '#CDE2D0',
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
    backgroundColor: '#CDE2D0',
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
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '100',
    marginTop: 10,

  },
  buttonDisabled: {
    opacity: 0.7,
  },
  createAccountButton: {
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '200',

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "800",
  },
  logopic: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 80,
  },
  canopyText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: -80,
    marginTop: -80,
  }
});

export default LoginScreen;
