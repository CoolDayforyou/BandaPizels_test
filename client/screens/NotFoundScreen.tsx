import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Button from "@/components/ui/Button";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Routes } from "@/constants/Routes";

type Props = {
  errorMessage?: string;
};

const NotFoundScreen = ({ errorMessage }: Props) => {
  const router = useRouter();

  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: 100,
            color: textColor,
          },
        ]}
      >
        404
      </Text>

      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {errorMessage || "Oops, this is wrong page. It doesn't exist :("}
      </Text>
      <Button
        title="Go to products"
        handlePress={() => {
          router.replace(Routes.PRODUCTS);
        }}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    fontFamily: Fonts.Gabarito,
  },

  button: {
    marginTop: 15,
    width: "60%",
  },
});
