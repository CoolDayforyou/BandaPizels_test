import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";

const Loading = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.75, 0.5, 0.25, 1),
      }),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyle]} />
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  loader: {
    width: 100,
    height: 100,
    borderColor: Colors.accentColor,
    borderRadius: "100%",
    borderWidth: 8,
    borderBottomWidth: 1,
    borderRightWidth: 0,
  },
});
