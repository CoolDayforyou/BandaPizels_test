import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Alata: require("@/assets/fonts/Alata-Regular.ttf"),
    Gabarito: require("@/assets/fonts/Gabarito-Variable.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products"
          options={{
            title: "Products",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products/[productId]"
          options={{
            title: "Product",
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
    </>
  );
}
