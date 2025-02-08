import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

// Sample Data (You can replace this with your own data)
const data = [
  {
    id: 1,
    name: "Item 1",
    image: "https://picsum.photos/300/400?random=1",
    description: "This is item 1",
  },
  {
    id: 2,
    name: "Item 2",
    image: "https://picsum.photos/300/400?random=2",
    description: "This is item 2",
  },
];

const SwipeableStack = () => {
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const nextIndex = index + 1 < data.length ? index + 1 : 0;

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const threshold = width * 0.3;
      if (Math.abs(event.translationX) > threshold) {
        // Determine direction and animate exit
        translateX.value = withSpring(event.translationX > 0 ? width : -width, {}, () => {
          setIndex(nextIndex);
          translateX.value = 0;
          translateY.value = 0;
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const nextImageStyle = useAnimatedStyle(() => ({
    opacity: interpolate(Math.abs(translateX.value), [0, width * 0.3], [0.5, 1]),
  }));

  return (
    <View style={styles.container}>
      {/* Next Item (Fades in as the top card is swiped) */}
      {index + 1 < data.length && (
        <Animated.View style={[styles.card, nextImageStyle]}>
          <Image source={{ uri: data[nextIndex].image }} style={styles.image} />
          <Text style={styles.text}>{data[nextIndex].name}</Text>
        </Animated.View>
      )}

      {/* Top Item (Swipeable) */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Image source={{ uri: data[index].image }} style={styles.image} />
          <Text style={styles.text}>{data[index].name}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: 300,
    height: 400,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SwipeableStack;
