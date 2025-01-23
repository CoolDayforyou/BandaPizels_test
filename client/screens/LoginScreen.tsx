import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginStatus, LoginType } from "@/types/Types";
import Loading from "@/components/Loading";
import client from "@/api/client";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useIsUserLogged } from "@/hooks/useUser";

const LoginScreen = () => {
  const router = useRouter();

  const [inputType, setInputType] = useState<keyof LoginType>("username");
  const [loginInfo, setLoginInfo] = useState<LoginType>({
    username: "mor_2314",
    password: "83r5^_",
  }); //? For quick login in test

  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loading: true,
    errorMessage: undefined,
  });

  const screenDimensions = Dimensions.get("screen");
  const position = useSharedValue(0);

  const usernameStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const passwordStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value + screenDimensions.width }],
  }));

  // Check, is user already logged in
  const { isLogged, isLoading } = useIsUserLogged();

  useEffect(() => {
    if (!isLoading && isLogged) {
      router.replace("/products");
    } else if (!isLoading) {
      setLoginStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [isLogged, isLoading, router]);

  const handleInputType = async () => {
    if (inputType === "username" && loginInfo.username.length) {
      setInputType("password");
      position.value = withSpring(-screenDimensions.width);
    } else {
      try {
        // Login user & get token in response
        const { data } = await client.post("/auth/login", {
          username: loginInfo.username,
          password: loginInfo.password,
        });

        // Set token for auto login
        await AsyncStorage.setItem("token", data.token);

        // Clear inputs
        setLoginInfo({
          username: "",
          password: "",
        });

        // Start loading & clear error message
        setLoginStatus({
          loading: true,
          errorMessage: undefined,
        });

        // Go to '/products' page
        return router.push("/products");
      } catch (error) {
        setLoginStatus({
          loading: false,
          errorMessage: useErrorHandler(error),
        });
      } finally {
        // Stop loading
        setLoginStatus((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
      setInputType("username");
      position.value = withSpring(0);
    }
  };

  if (isLoading || loginStatus.loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign in</Text>
      <Animated.View style={[styles.form, usernameStyle]}>
        {inputType === "username" && (
          <FormField
            placeholder="Username"
            handleChange={(event) =>
              setLoginInfo({ ...loginInfo, username: event.nativeEvent.text })
            }
            value={loginInfo.username}
          />
        )}
      </Animated.View>
      <Animated.View style={[styles.form, passwordStyle]}>
        {inputType === "password" && (
          <FormField
            placeholder="Password"
            handleChange={(event) =>
              setLoginInfo({ ...loginInfo, password: event.nativeEvent.text })
            }
            value={loginInfo.password}
          />
        )}
      </Animated.View>

      <Button
        title="Continue"
        handlePress={handleInputType}
        isDisabled={
          (inputType === "username" && !loginInfo.username.length) ||
          (inputType === "password" && !loginInfo.password.length)
        }
      />

      <Text style={styles.errorText}>{loginStatus.errorMessage}</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
    paddingHorizontal: 23,
    backgroundColor: Colors.backgroundColor,
  },
  headerText: {
    alignSelf: "flex-start",
    marginLeft: 4,
    marginBottom: 32,
    color: "#FFF",
    letterSpacing: -0.41,
    fontSize: 32,
    fontFamily: "Alata",
  },
  form: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    width: "100%",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: -0.41,
    color: "#FFF",
    fontFamily: "Alata",
    textTransform: "capitalize",
  },
});
