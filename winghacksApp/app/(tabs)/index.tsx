import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Image, 
  Dimensions, 
  StyleSheet,
  ScrollView,
  Animated,
  Platform
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';
import { auth, database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

interface UserProfile {
  id: string;
  displayName: string;
  organizations: string;
  year: string;
  major: string;
  interests: string;
  image: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IndexScreen = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedInterests, setSelectedInterests] = useState('');
  const [userData, setUserData] = useState<UserProfile[]>([]);
  const [filteredData, setFilteredData] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  
  const swiperRef = useRef(null);

  const renderCard = (item: UserProfile) => {
    if (!item) return null;
    
    return (
      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
          </View>
          <Text style={styles.profileName}>{item.displayName}</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.major}>{item.major}</Text>
          <Text style={styles.organization}>{item.organizations}</Text>
          <Text style={styles.year}>{item.year}</Text>
          <Text style={styles.interests}>{item.interests}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        const currentUser = auth.currentUser;
        console.log('Auth state:', { 
          isAuthenticated: !!currentUser,
          userId: currentUser?.uid,
          email: currentUser?.email 
        });

        if (!currentUser) {
          setError('Please log in to view user profiles');
          setLoading(false);
          return;
        }

        const usersRef = ref(database, 'users');
        console.log('Attempting to fetch data from:', usersRef.toString());
        
        const unsubscribe = onValue(usersRef, (snapshot) => {
          console.log('Database snapshot:', { 
            exists: snapshot.exists(),
            childrenCount: snapshot.size,
            key: snapshot.key
          });
          
          if (snapshot.exists()) {
            const usersData = snapshot.val();
            const users: UserProfile[] = Object.entries(usersData).map(([id, data]: [string, any]) => ({
              id,
              displayName: data.displayName || '',
              organizations: data.organizations || '',
              year: data.year || '',
              major: data.major || '',
              interests: data.interests || '',
              image: data.image || ''
            }));
            
            setUserData(users);
            setFilteredData(users);
          } else {
            setUserData([]);
            setFilteredData([]);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error fetching users:', error);
          setError(error.message);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error('Error setting up database listener:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const onSwipedLeft = (cardIndex: number) => {
    console.log(`Swiped left on card ${cardIndex}`);
    setCanUndo(true);
  };

  const onSwipedRight = (cardIndex: number) => {
    console.log(`Swiped right on card ${cardIndex}`);
    setCanUndo(true);
  };

  const handleUndo = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeBack();
      setCanUndo(false);
    }
  };

  const applyFilters = () => {
    const filtered = userData.filter((item) => {
      const matchesOrg =
        selectedOrganizations.length === 0 ||
        selectedOrganizations.includes(item.organizations);
      const matchesYear =
        selectedYear === '' || selectedYear === item.year;
      const matchesMajor =
        selectedMajor === '' || selectedMajor === item.major;
      const matchesInterests =
        selectedInterests.length === 0 ||
        selectedInterests === '' || selectedInterests === item.interests;
  
      return matchesOrg && matchesYear && matchesMajor && matchesInterests;
    });
  
    setFilteredData(filtered);
    setFiltersVisible(false);
  };

  const availableOrganizations = [...new Set(userData.map(user => user.organizations))];
  const availableMajors = [...new Set(userData.map(user => user.major))];
  const availableInterests = [...new Set(userData.flatMap(user => user.interests))];

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFiltersVisible(true)}
      >
        <Ionicons displayName="filter" size={24} color="#ffffff" />
        <Text style={styles.filterText}>Filters</Text>
      </TouchableOpacity>


      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={filteredData}
          renderCard={renderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          stackScale={10}
          stackSeparation={14}
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: '#FF0000',
                  color: '#fff',
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'CONNECT',
              style: {
                label: {
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
      </View>

      <Modal visible={filtersVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Apply Filters</Text>

          <Text style={styles.label}>Organizations</Text>
          <ScrollView style={styles.scrollContainer}>
            {availableOrganizations.map((org) => (
              <TouchableOpacity
                key={org}
                style={[
                  styles.option,
                  selectedOrganizations.includes(org) && styles.selectedOption,
                ]}
                onPress={() => {
                  if (selectedOrganizations.includes(org)) {
                    setSelectedOrganizations((prev) => prev.filter((item) => item !== org));
                  } else {
                    setSelectedOrganizations((prev) => [...prev, org]);
                  }
                }}
              >
                <Text>{org}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Majors</Text>
          <ScrollView style={styles.scrollContainer}>
            {availableMajors.map((major) => (
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
          </ScrollView>

          <Text style={styles.label}>Interests</Text>
          <ScrollView style={styles.scrollContainer}>
            {availableInterests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.option,
                  selectedInterests === interest && styles.selectedOption,
                ]}
                onPress={() => setSelectedInterests(interest)}
              >
                <Text>{interest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE2D0',
    paddingTop: 20,
  },
  swiperContainer: {
    flex: 1,
    marginTop: 75,
  },
  card: {
    height: SCREEN_HEIGHT * 0.65,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginTop: 70,
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
    marginBottom: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
  },
  cardContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  major: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  organization: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  year: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  interests: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 0,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 0,
    backgroundColor: '#FFCDAB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  filterText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: -5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CDE2D0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 90,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFCDAB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexScreen;
