import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

const indexScreen = () => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
        <Text style={styles.organization}>{item.organization}</Text>
        <Text style={styles.year}>{item.year}</Text>
        <Text style={styles.interests}>Interests: {item.interests.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={testData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4E0', // Match forest pastel theme
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  organization: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  year: {
    fontSize: 12,
    color: '#777',
  },
  interests: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default indexScreen;