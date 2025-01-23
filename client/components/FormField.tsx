import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

type Props = {
  placeholder: string;
  value: string;
  handleChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

const FormField = ({ placeholder, value, handleChange }: Props) => {
  return (
    <View style={styles.formField}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryColor}
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
    backgroundColor: Colors.textInputColor,
    color: "#FFF",
    borderRadius: 4,
    fontSize: 16,
    letterSpacing: -0.41,
    fontFamily: "Alata",
  },
});
