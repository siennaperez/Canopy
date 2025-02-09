import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

export const uploadImageToFirebase = async (localUri: string): Promise<string> => {
  try {
    // Convert local URI to blob
    const response = await fetch(localUri);
    const blob = await response.blob();

    // Generate a unique filename
    const filename = localUri.split('/').pop() || Date.now().toString();
    const storageRef = ref(storage, `profile-images/${filename}`);

    // Upload blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the public URL
    const publicUrl = await getDownloadURL(storageRef);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
