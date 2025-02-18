import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React from "react";

import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  placeholder: string;
  value: string;
  handleChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

const FormField = ({ placeholder, value, handleChange }: Props) => {
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("textInput");
  const placeholderColor = useThemeColor("secondary");

  return (
    <View style={styles.formField}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor,
            color: textColor,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChange={handleChange}
        value={value}
        autoCorrect={false}
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  formField: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
    padding: 12,
    height: 56,
    borderRadius: 4,
    fontSize: 16,
    letterSpacing: -0.41,
    fontFamily: Fonts.Alata,
  },
});
