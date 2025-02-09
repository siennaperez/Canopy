import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, View, Text, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../../firebase';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { ref, set, onValue } from 'firebase/database';

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    organizations: '',
    year: '',
    major: '',
    interests: '',
    image: null,
    email: '',
    displayName: ''
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Set basic user info
      setUserProfile(prev => ({
        ...prev,
        email: currentUser.email || '',
        displayName: currentUser.displayName || ''
      }));

      // Fetch existing profile data
      const userRef = ref(database, 'users/' + currentUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserProfile(prev => ({
            ...prev,
            ...data
          }));
          if (data.image) {
            setImage(data.image);
          }
        }
      });
    } else {
      // Redirect to login if no user is found
      router.replace('/(login)');
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No user logged in');
        return;
      }

      await set(ref(database, 'users/' + currentUser.uid), {
        ...userProfile,
        image,
        updatedAt: new Date().toISOString()
      });
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('currentUser');
      router.replace('/(login)');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>{userProfile.displayName}</Text>

        {/* Profile Picture */}
        <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="person-outline" size={40} color="#666" />
            </View>
          )}
          <View style={styles.imageOverlay}>
            <Ionicons name="camera" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Organizations</Text>
          <TextInput
            style={styles.input}
            value={userProfile.organizations}
            onChangeText={(text) => handleInputChange('organizations', text)}
            placeholder="Enter organizations"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={userProfile.year}
            onChangeText={(text) => handleInputChange('year', text)}
            placeholder="Enter year"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            value={userProfile.major}
            onChangeText={(text) => handleInputChange('major', text)}
            placeholder="Enter major"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Interests</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={userProfile.interests}
            onChangeText={(text) => handleInputChange('interests', text)}
            placeholder="Enter interests"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.buttonDisabled]}
          onPress={saveProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE2D0',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100,
    textAlign: 'center',
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 60,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FFCDAB',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: 160,
    alignContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
  },
  logoutButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    backgroundColor: '#FFCDAB',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
