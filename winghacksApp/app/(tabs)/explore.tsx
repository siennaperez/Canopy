import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Friends Section */}
      <Text style={styles.sectionTitle}>Your friends</Text>
      <ScrollView horizontal style={styles.friendsContainer}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View key={index} style={styles.friendAvatar}></View>
        ))}
      </ScrollView>

      {/* Messages Section */}
      <Text style={styles.sectionTitle}>Messages</Text>
      <View style={styles.messagesContainer}>
        {[
          { username: "Alex", message: "Hey there!" },
          { username: "Taylor", message: "Let's meet up!" },
          { username: "Jordan", message: "Check this out!" },
        ].map((chat, index) => (
          <View key={index} style={styles.messageItem}>
            <View style={styles.messageAvatar}></View>
            <View style={styles.messageText}>
              <Text style={styles.username}>{chat.username}</Text>
              <Text style={styles.message}>{chat.message}</Text>
            </View>
            <Ionicons name="star-outline" size={20} color="#F28B34" />
          </View>
        ))}
      </View>

      {/* Surprise Me Section */}
      <TouchableOpacity style={styles.surpriseContainer}>
        <Text style={styles.surpriseTitle}>Not sure what to do with a friend?</Text>
        <Text style={styles.surpriseSubtitle}>We got you.</Text>
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
    marginVertical: 30,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  friendsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
    marginRight: 12,
  },
  messagesContainer: {
    marginTop: 10,
    marginBottom: 150,
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
    backgroundColor: "#F4ECE9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 100,
  },
  surpriseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  surpriseSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  surpriseButton: {
    backgroundColor: "#F28B34",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  surpriseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExploreScreen;
