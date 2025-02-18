import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TouchableOpacityProps & {
  title: string;
  handlePress: () => void;
};

const Button = ({ title, handlePress, style, disabled, ...rest }: Props) => {
  const accentColor = useThemeColor("accent");
  const touchableColor = useThemeColor("touchable");

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: accentColor },
        disabled && {
          backgroundColor: touchableColor,
        },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      {...rest}
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
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: Fonts.Alata,
    fontSize: 16,
    letterSpacing: -0.5,
  },
});
