import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  handlePress: () => void;
  isDisabled?: boolean;
};

const Button = ({ title, handlePress, isDisabled }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && {
          backgroundColor: Colors.touchableColor,
        },
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accentColor,
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Alata",
    fontSize: 16,
    letterSpacing: -0.5,
  },
});
