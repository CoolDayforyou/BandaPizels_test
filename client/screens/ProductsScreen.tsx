import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { useGetProducts } from "@/hooks/useGetData";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Routes } from "@/constants/Routes";

const ProductsScreen = () => {
  const router = useRouter();
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");
  const textInputColor = useThemeColor("textInput");

  const {
    isLogged,
    isLoading,
    productsArray: products,
    errorMessage,
  } = useGetProducts();

  useEffect(() => {
    if (!isLogged && !isLoading) {
      return router.replace(Routes.LOGIN);
    }
  }, [isLoading, isLogged, products, errorMessage]);

  if (isLoading) {
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
          styles.titleText,
          {
            color: textColor,
          },
        ]}
      >
        Products
      </Text>
      {errorMessage && (
        <Text
          style={[
            styles.error,
            {
              backgroundColor: textInputColor,
              color: textColor,
            },
          ]}
        >
          {errorMessage}
        </Text>
      )}
      <FlatList
        columnWrapperStyle={styles.products}
        numColumns={2}
        keyExtractor={(product) => product.id.toString()}
        data={products}
        renderItem={(product) => <ProductCard product={product.item} />}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 43,
    paddingHorizontal: 20,
  },
  titleText: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: Fonts.Alata,
  },
  products: {
    gap: 20,
  },
  error: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    fontFamily: Fonts.Alata,
  },
});
