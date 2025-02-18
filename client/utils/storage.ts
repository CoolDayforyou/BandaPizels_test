import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN = "token";

export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((cookie) =>
        cookie.startsWith(`${TOKEN}=`),
      );
      if (tokenCookie) {
        return tokenCookie.split("=")[1];
      }
      return null;
    }
    return await SecureStore.getItemAsync(TOKEN);
  } catch (error) {
    console.log("Error while getting token: ", error);
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  try {
    if (!token) {
      return;
    }
    if (Platform.OS === "web") {
      document.cookie = `${TOKEN}=${token}; path=/; SameSite=Strict`;
    } else {
      await SecureStore.setItemAsync(TOKEN, token);
    }
  } catch (error) {
    console.log("Error while setting token: ", error);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      document.cookie = `${TOKEN}=; path=/; Max-Age=0`;
    } else {
      await SecureStore.deleteItemAsync(TOKEN);
    }
  } catch (error) {
    console.log("Error while removing token: ", error);
  }
};
