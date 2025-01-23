import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.log("Error while getting token: ", error);
    return null;
  }
}
