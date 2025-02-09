import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  getRequest  from "../AIRequest";

const Avatar = ({ source }) => {
  return (
    <Image source={source} style={styles.avatarImage} />
  );
};
const AvatarScroll = ({ source }) => {
  return (
    <Image source={source} style={styles.avatarImageScroll} />
  );
};

const ExploreScreen = () => {
  // Static image sources
  const pic1 = require('../../assets/images/lincy.png');
  const pic2 = require('../../assets/images/sienna.png');
  const pic3 = require('../../assets/images/jenna.png');

  const messages = [
    { username: "Lincy Phipps", message: "Hey there!", avatar: pic1 },
    { username: "Sienna Perez", message: "Let's meet up!", avatar: pic2 },
    { username: "Jenna Fonsing", message: "Check this out!", avatar: pic3 }
  ];
  const [surpriseText, setSurpriseText] = useState<string | null>(null);

  const handleSurpriseMe = async () => {
    try {
      console.log("Surprise me button pressed");
      const response = await getRequest();

      setSurpriseText(response.choices[0].message.content); // Store fetched text in state
    } catch (error) {
      console.error(error);
      setSurpriseText("Failed to load suggestion.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#aaa" />
      </View>

      {/* Friends Section */}
      <Text style={styles.sectionTitle}>Your friends</Text>
      <ScrollView horizontal style={styles.friendsContainer}>
        <AvatarScroll source={pic1}  />
        <AvatarScroll source={pic2}  />
        <AvatarScroll source={pic3}/>
      </ScrollView>

      {/* Messages Section */}
      <Text style={styles.sectionTitle}>Messages</Text>
      <View style={styles.messagesContainer}>
        {messages.map((chat, index) => (
          <View key={index} style={styles.messageItem}>
            <View style={styles.messageAvatar}>
              <Avatar source={chat.avatar} />
            </View>
            <View style={styles.messageText}>
              <Text style={styles.username}>{chat.username}</Text>
              <Text style={styles.message}>{chat.message}</Text>
            </View>
            <Ionicons name="star-outline" size={20} color="#F28B34" />
          </View>
        ))}
      </View>
    {/* Surprise Me Section */}
    <TouchableOpacity style={styles.surpriseContainer} onPress={handleSurpriseMe}>
        <Text style={styles.surpriseTitle}>
          {surpriseText || "Not sure what to do with a friend?"}
        </Text>
        <Text style={styles.surpriseSubtitle}>
          {surpriseText ? "" : "We got you."}
        </Text>
        <View style={styles.surpriseButton}>
          <Text style={styles.surpriseButtonText}>Surprise me →</Text>
        </View>
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDE2D0",
    padding: 16,
    justifyContent: "flex-start",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    marginVertical: 50,
    marginTop: 50,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  friendsContainer: {
    flexDirection: "row",
    marginBottom: 0,
    padding: -100,
  },
  friendAvatar: {
    width: 80,
    height: 80,
    backgroundColor: "#E8E8E8",
    borderRadius: 40,
    marginRight: 12,
    marginBottom: -20,
  },
  messagesContainer: {
    marginTop: 10,
    marginBottom: 330,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
  surpriseContainer: {
    position: "absolute",
    bottom: 18, // Move it up or down as needed
    left: 16,
    right: 16,
    backgroundColor: "#E8A68E",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 100,
  },
  surpriseTitle: {
    fontSize: 18,
    //fontWeight: "bold",
    marginBottom: 4,
  },
  surpriseSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  surpriseButton: {
    backgroundColor: "#FFCDAB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  surpriseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarImageScroll: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 12,
    marginBottom: -20,
  },
});

export default ExploreScreen;
