import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const testData = [
  {
    id: '1',
    name: 'Alex Johnson',
    bio: 'Love exploring, coffee, and tech.',
    organization: 'UF Computer Science',
    year: 'Sophomore',
    interests: ['Hiking', 'Gaming', 'AI'],
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Taylor Green',
    bio: 'Passionate about environmental science!',
    organization: 'UF Environmental Club',
    year: 'Senior',
    interests: ['Sustainability', 'Gardening', 'Yoga'],
    image: 'https://via.placeholder.com/100',
  },
];

const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.card}>
    {/* Profile Picture */}
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
      </View>
    </View>

    {/* User Details */}
    <View style={styles.cardContent}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.bio}>{item.bio}</Text>
      <Text style={styles.organization}>{item.organization}</Text>
      <Text style={styles.year}>{item.year}</Text>
      <Text style={styles.interests}>Interests: {item.interests.join(', ')}</Text>
    </View>

    {/* Large Blue Box */}
    <View style={styles.imageContainer}>
      <View style={styles.largeImagePlaceholder}>
        <Text style={styles.imageText}>Picture Placeholder</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const indexScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={testData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true} // horizontal scrolling
        pagingEnabled // snap to one card at a time
        showsHorizontalScrollIndicator={false} // hide the scrollbar
        contentContainerStyle={{
          paddingHorizontal: 16, // add space on the left and right
          backgroundColor: '#E3F4E0', // green background
          paddingTop: 80,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4E0',
  },
  card: {
    width: Dimensions.get('window').width * 0.8, 
    height: Dimensions.get('window').height * 0.75, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    borderRadius: 20,
    marginHorizontal: 16, 
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3', // placeholder for the profile picture
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 40,
    lineHeight: 24,
  },
  cardContent: {
    width: '100%',
    alignItems: 'center', 
    marginBottom: 12,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 24,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  organization: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 4,
    lineHeight: 24,
  },
  year: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginHorizontal: 16,
    lineHeight: 24,
  },
  interests: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  imageContainer: {
    alignItems: 'center',
  },
  largeImagePlaceholder: {
    height: 200,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default indexScreen;
