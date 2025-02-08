import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("");
  const [organization, setOrganization] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [interests, setInterests] = useState("");
  const [image, setImage] = useState(null);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) Alert.alert("Edit Mode Enabled");
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need camera roll permissions.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // } 
  };

  return (
    <View style={styles.screenContainer}>
      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
      <Ionicons name="create" size={24} color="#3b82f6" />
        {/* <Icon name={editMode ? 'check' : 'edit-2'} size={24} color="#3b82f6" /> */}
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Section */}
          <View style={styles.header}>
            <View style={styles.profilePicturePlaceholder}>
              {image && <Image source={{ uri: image }} style={styles.profileImage} />}
            </View>
            <Text style={styles.nameText}>Name</Text>
          </View>

          {/* Bio Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, !editMode && styles.readOnly]}
              placeholder="Answer the frequently asked question..."
              multiline
              editable={editMode}
              value={bio}
              onChangeText={setBio}
            />
          </View>

          {/* Input Fields */}
          <View style={styles.card}>
            <Text style={styles.label}>Organization Name(s)</Text>
            <TextInput
              style={[styles.input, !editMode && styles.readOnly]}
              placeholder="Enter organization name(s)"
              editable={editMode}
              value={organization}
              onChangeText={setOrganization}
            />

            <Text style={styles.label}>Year</Text>
            <TextInput
              style={[styles.input, !editMode && styles.readOnly]}
              placeholder="Enter year"
              editable={editMode}
              value={year}
              onChangeText={setYear}
            /> 

            <Text style={styles.label}>Major</Text>
            <TextInput
              style={[styles.input, !editMode && styles.readOnly]}
              placeholder="Enter major"
              editable={editMode}
              value={major}
              onChangeText={setMajor}
            />

            <Text style={styles.label}>Interests</Text>
            <TextInput
              style={[styles.input, !editMode && styles.readOnly]}
              placeholder="Enter interests"
              editable={editMode}
              value={interests}
              onChangeText={setInterests}
            />
          </View>

          {/* Floating Button */}
          <TouchableOpacity style={styles.floatingButton} onPress={handleImagePick}>
          <Ionicons name="add" size={32} color="#ffffff" />
            {/* <Icon name="plus" size={32} color="#ffffff" /> */}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E3F4E0',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#d3d3d3',
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0eded',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  readOnly: {
    backgroundColor: '#e0e0e0',
  },
  floatingButton: {
    width: 70,
    height: 70,
    backgroundColor: '#3b82f6',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  editButton: {
    position: 'absolute',
    top: 60, // Lowered button position
    right: 20,
    zIndex: 1,
  },
});

export default ProfileScreen;
