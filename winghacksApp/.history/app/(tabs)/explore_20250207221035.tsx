import { StyleSheet, Image, Platform, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = "CURRENT_USER_ID"; // Replace this with the logged-in user's ID

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`http://your-api-url.com/feed/${userId}`);
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      
      {/* Header */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Matches</ThemedText>
      </ThemedView>

      {/* Show Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#808080" />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.profileCard}>
              <Image source={{ uri: item.photos[0] }} style={styles.profileImage} />
              <ThemedText type="title">{item.name}, {item.age}</ThemedText>
              <ThemedText>{item.bio}</ThemedText>
            </View>
          )}
        />
      )}

      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/feed.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  profileCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

