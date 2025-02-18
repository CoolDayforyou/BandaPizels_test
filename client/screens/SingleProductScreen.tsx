import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useGetSingleProduct } from "@/hooks/useGetData";
import Loading from "@/components/Loading";
import { AntDesign } from "@expo/vector-icons";

import NotFoundScreen from "./NotFoundScreen";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/hooks/useAuth";
import { Routes } from "@/constants/Routes";

type Props = {
  productId: string;
};

const SingleProductScreen = ({ productId }: Props) => {
  const router = useRouter();
  const backgroundColor = useThemeColor("background");
  const primaryColor = useThemeColor("text");
  const secondaryColor = useThemeColor("secondary");
  const touchableColor = useThemeColor("touchable");
  const accentColor = useThemeColor("accent");

  const {
    isLoading,
    isLogged,
    productData: product,
    errorMessage,
  } = useGetSingleProduct(productId);

  useEffect(() => {
    if (!isLogged && !isLoading) {
      return router.push(Routes.LOGIN);
    }
  }, [isLoading, isLogged, product, errorMessage]);

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage || !product) {
    return <NotFoundScreen errorMessage={errorMessage} />;
  }

  const handlePressReturn = async () => {
    if (router.canGoBack()) {
      return router.back();
    }
    return router.push(Routes.PRODUCTS);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Return icon */}
        <TouchableOpacity onPress={handlePressReturn}>
          <AntDesign name="leftcircle" size={40} color={touchableColor} />
        </TouchableOpacity>

        <View style={styles.product}>
          {/* Image */}
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.productImage}
          />

          {/* Product name & price */}
          <View style={styles.mainInfo}>
            <Text
              style={[
                styles.titleText,
                {
                  color: primaryColor,
                },
              ]}
            >
              {product.title}
            </Text>
            <Text
              style={[
                styles.price,
                {
                  color: accentColor,
                },
              ]}
            >
              ${product.price.toFixed(2)}
            </Text>
          </View>

          {/* Product secondary info */}
          <View style={styles.description}>
            {/* Product description */}
            <Text
              style={[
                styles.infoText,
                {
                  color: secondaryColor,
                },
              ]}
            >
              {product.description}
            </Text>

            {/* Shipping & Returns */}
            <View
              style={{
                gap: 12,
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    color: primaryColor,
                  },
                ]}
              >
                Shipping & Returns
              </Text>
              <Text
                style={[
                  styles.infoText,
                  {
                    color: secondaryColor,
                  },
                ]}
              >
                Free standard shipping and free 60-day returns
              </Text>
            </View>

            {/* Reviews */}
            <View
              style={{
                gap: 16,
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    color: primaryColor,
                  },
                ]}
              >
                Reviews
              </Text>

              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: 24,
                    color: primaryColor,
                  },
                ]}
              >
                {product.rating.rate} Ratings
              </Text>

              <Text
                style={[
                  styles.infoText,
                  {
                    color: secondaryColor,
                  },
                ]}
              >
                {product.rating.count} Reviews
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingVertical: 63,
    gap: 12,
  },
  product: {
    flex: 1,
    width: "100%",
    gap: 12,
  },
  productImage: {
    alignSelf: "center",
    width: 177,
    height: 273,
    borderRadius: 8,
  },
  mainInfo: {
    gap: 8,
  },
  titleText: {
    fontFamily: Fonts.Alata,
    fontSize: 16,
  },
  price: {
    fontFamily: Fonts.Gabarito,
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    gap: 24,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 12 * 1.6,
  },
});
