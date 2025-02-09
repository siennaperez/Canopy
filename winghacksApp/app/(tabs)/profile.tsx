import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, View, Text, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [userProfile, setUserProfile] = useState({
    organizations: '',
    year: '',
    major: '',
    interests: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.replace('/(login)');
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserProfile({
            organizations: data.organizations || '',
            year: data.year || '',
            major: data.major || '',
            interests: data.interests || ''
          });
          if (data.image) {
            setImage(data.image);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need camera roll permissions to change your profile picture.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      // Save the image URI to Firestore along with other profile data
      handleSave(result.assets[0].uri);
    }
  };

  const handleSave = async (newImage = image) => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Not logged in');
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...userProfile,
        image: newImage,
        updatedAt: new Date().toISOString()
      });
      
      Alert.alert('Success', 'Profile saved!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('currentUser');
      router.replace('/(login)');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#000000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Profile</Text>

        {/* Profile Picture */}
        <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person-outline" size={40} color="#666" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Organizations</Text>
          <TextInput
            style={styles.input}
            value={userProfile.organizations}
            onChangeText={(text) => setUserProfile(prev => ({ ...prev, organizations: text }))}
            placeholder="Enter organizations"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={userProfile.year}
            onChangeText={(text) => setUserProfile(prev => ({ ...prev, year: text }))}
            placeholder="Enter year"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            value={userProfile.major}
            onChangeText={(text) => setUserProfile(prev => ({ ...prev, major: text }))}
            placeholder="Enter major"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Interests</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={userProfile.interests}
            onChangeText={(text) => setUserProfile(prev => ({ ...prev, interests: text }))}
            placeholder="Enter interests"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.buttonDisabled]}
          onPress={() => handleSave()}
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
    backgroundColor: '#B5D1C9',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 80,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FFCDAB',
    padding: 8,
    borderRadius: 15,
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
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
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
