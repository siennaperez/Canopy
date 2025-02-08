import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import Slider from '@react-native-community/slider';

const testData = [
  {
    id: '1',
    name: 'Alex Johnson',
    bio: 'Love exploring, coffee, and tech.',
    organization: 'UF Computer Science',
    year: 2,
    major: 'CS',
    interests: ['Hiking', 'Gaming', 'AI'],
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Taylor Green',
    bio: 'Passionate about environmental science!',
    organization: 'UF Environmental Club',
    year: 4,
    major: 'Biology',
    interests: ['Sustainability', 'Gardening', 'Yoga'],
    image: 'https://via.placeholder.com/100',
  },
];

const IndexScreen = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(testData);

  const applyFilters = () => {
    const filtered = testData.filter((item) => {
      const matchesOrg =
        selectedOrganizations.length === 0 ||
        selectedOrganizations.includes(item.organization);
      const matchesYear =
        selectedYear === 0 || selectedYear === item.year;
      const matchesMajor =
        selectedMajor === '' || selectedMajor === item.major;
      const matchesInterests =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) => item.interests.includes(interest));
  
      return matchesOrg && matchesYear && matchesMajor && matchesInterests;
    });
  
    setFilteredData(filtered);
    setFiltersVisible(false);
  };  

  const yearLabels = {
    1: 'Freshman',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
  };
  
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
        <Text style={styles.year}></Text>
        <Text style={styles.year}>{yearLabels[item.year as keyof typeof yearLabels]}</Text>
        <Text style={styles.interests}>
          Interests: {item.interests.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filters Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFiltersVisible(true)}
      >
        <Ionicons name="filter" size={24} color="#ffffff" />
        <Text style={styles.filterText}>Filters</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal visible={filtersVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Apply Filters</Text>

          {/* Organizations Multi-Select */}
          <Text style={styles.label}>Organizations</Text>
          <ScrollView style={styles.scrollContainer}>
            {['UF Computer Science', 'UF Environmental Club'].map((org) => (
              <TouchableOpacity
                key={org}
                style={[
                  styles.option,
                  selectedOrganizations.includes(org) && styles.selectedOption,
                ]}
                onPress={() => {
                  setSelectedOrganizations((prev) => {
                    if (prev.includes(org)) {
                      return prev.filter((item) => item !== org);
                    } else {
                      return [...prev, org];
                    }
                  });
                }}
              >
                <Text>{org}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Year Slider */}
          <Text style={styles.label}>Year</Text>
            <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={4}
            step={1}
            value={selectedYear} // Keep state as a number
            onValueChange={(value) => setSelectedYear(value)} // Directly set number
          />
          <Text style={styles.yearText}>{`Year: ${selectedYear}`}</Text>

          {/* Major Single-Select */}
          <Text style={styles.label}>Major</Text>
          {['CS', 'Biology', 'Engineering'].map((major) => (
            <TouchableOpacity
              key={major}
              style={[
                styles.option,
                selectedMajor === major && styles.selectedOption,
              ]}
              onPress={() => setSelectedMajor(major)}
            >
              <Text>{major}</Text>
            </TouchableOpacity>
          ))}

          {/* Interests Multi-Select */}
          <Text style={styles.label}>Interests</Text>
          <ScrollView style={styles.scrollContainer}>
            {['Hiking', 'Gaming', 'Reading', 'Music'].map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.option,
                  selectedInterests.includes(interest) && styles.selectedOption,
                ]}
                onPress={() => {
                  setSelectedOrganizations((prev) => {
                    if (prev.includes(interest)) {
                      return prev.filter((item) => item !== interest);
                    } else {
                      return [...prev, interest];
                    }
                  });
                }}                
              >
                <Text>{interest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Apply Filters */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setFiltersVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={applyFilters}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* User Cards */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          backgroundColor: '#E3F4E0',
          paddingTop: 80,
        }}
      />
      {/* Add Friend Button below card*/}
      <TouchableOpacity style={styles.addFriendButton} onPress={() => console.log('Add Friend Pressed')}>
        <Text style={styles.addFriendButtonText}>Add Friend</Text>
      </TouchableOpacity>
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
  filterButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#E8A68E',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  filterText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#cbd9bf',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollContainer: {
    maxHeight: 150,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#88b393',
    color: '#ffffff',
  },
  modalButtons: {
    flexDirection: 'row', // Buttons side-by-side
    justifyContent: 'space-between', // Space between the buttons
    marginTop: 16,
  },
  modalButton: {
    flex: 1, // Ensure equal width buttons
    marginHorizontal: 8, // Add spacing between buttons
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3b82f6', // Blue button color
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#ffffff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 16, // Slightly larger text
    fontWeight: '600', // Semi-bold for emphasis
    color: '#555', // Neutral gray for readability
    textAlign: 'center', // Centered text
    marginVertical: 8, // Spacing around the text
  },
  addFriendButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#FFCDAB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addFriendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },  
});

export default IndexScreen;
