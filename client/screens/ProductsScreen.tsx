import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import { ProductType } from "@/types/Types";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { useGetProducts } from "@/hooks/useGetData";

const ProductsScreen = () => {
  const router = useRouter();

  const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<ProductType[]>([]);

  const { isLogged, isLoading, productsArray, errorMessage } = useGetProducts();

  useEffect(() => {
    if (!isLogged && !isLoading) {
      return router.push("/");
    }

    setProducts(productsArray);

    if (errorMessage) {
      setErrorStatus(errorMessage);
    }
  }, [isLoading, isLogged, productsArray, errorMessage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Products</Text>
      {errorStatus && <Text style={styles.error}>{errorStatus}</Text>}
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
    backgroundColor: Colors.backgroundColor,
    paddingTop: 43,
    paddingHorizontal: 20,
  },
  titleText: {
    marginBottom: 20,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Alata",
  },
  products: {
    gap: 20,
  },
  error: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: Colors.textInputColor,
    borderRadius: 5,
    color: "#FFF",
    fontFamily: "Alata",
  },
});
