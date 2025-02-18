import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useAuth } from "@/hooks/useAuth";
import { useErrorHandler } from "@/hooks/useErrorHandler";

import { authRoute } from "@/api/client";
import { LoginStatus, LoginType } from "@/types/Types";
import Loading from "@/components/Loading";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Routes } from "@/constants/Routes";

const LoginScreen = () => {
  const router = useRouter();

  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  const [inputType, setInputType] = useState<keyof LoginType>("username");
  const [loginInfo, setLoginInfo] = useState<LoginType>({
    username: "mor_2314",
    password: "83r5^_",
  }); //? For quick login in test

  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loading: true,
    errorMessage: undefined,
  });

  // Check, is user already logged in
  const { isLogged, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && isLogged) {
      router.replace(Routes.PRODUCTS);
    } else if (!isLoading) {
      setLoginStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [isLogged, isLoading, router]);

  const screenDimensions = Dimensions.get("screen");
  const position = useSharedValue(0);

  const usernameStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const passwordStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value + screenDimensions.width }],
  }));

  const handleInputType = async (): Promise<void> => {
    if (inputType === "username" && loginInfo.username.length) {
      setInputType("password");
      position.value = withSpring(-screenDimensions.width);
      setLoginStatus((prevState) => ({
        ...prevState,
        errorMessage: undefined,
      }));
    } else if (inputType === "password" && loginInfo.password.length) {
      try {
        let token: string;

        // Login user & get token in response
        const { data }: { data: { token: string } } = await authRoute.post(
          "/auth/login",
          {
            username: loginInfo.username,
            password: loginInfo.password,
          },
        );

        token = data.token;

        // Set token for auto login
        await login(token);

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
        router.push(Routes.PRODUCTS);
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

      if (loginInfo.password.length) {
        setInputType("username");
        position.value = withSpring(0);
      }
    }
  };

  if (isLoading || loginStatus.loading) {
    return <Loading />;
  }

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
          styles.headerText,
          {
            color: textColor,
          },
        ]}
      >
        Sign in
      </Text>
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
        disabled={
          (inputType === "username" && !loginInfo.username.length) ||
          (inputType === "password" && !loginInfo.password.length)
        }
      />

      <Text
        style={[
          styles.errorText,
          {
            color: textColor,
          },
        ]}
      >
        {loginStatus.errorMessage}
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 150,
    paddingHorizontal: 23,
  },
  headerText: {
    alignSelf: "flex-start",
    marginLeft: 4,
    marginBottom: 32,
    letterSpacing: -0.41,
    fontSize: 32,
    fontFamily: Fonts.Alata,
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
    fontFamily: Fonts.Alata,
    textTransform: "capitalize",
  },
});
