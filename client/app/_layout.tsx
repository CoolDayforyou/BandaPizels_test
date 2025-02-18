import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Routes } from "@/constants/Routes";

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
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name={Routes.LOGIN}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.PRODUCTS}
            options={{
              title: "Products",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.SINGLE_PRODUCT}
            options={{
              title: "Product",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.NOT_FOUND}
            options={{
              headerShown: false,
            }}
          />
        </Stack>

        <StatusBar style="light" backgroundColor={Colors.background} />
      </ThemeProvider>
    </AuthProvider>
  );
}
