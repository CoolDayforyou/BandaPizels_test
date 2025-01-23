import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { ProductType } from "@/types/Types";
import { Colors } from "@/constants/Colors";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <Text numberOfLines={1} style={styles.titleText}>
        {product.title}
      </Text>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: "50%",
    marginBottom: 20,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.touchableColor,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
  },
  titleText: {
    marginHorizontal: 4,
    marginVertical: 8,
    color: "#FFF",
    fontFamily: "Alata",
    fontSize: 12,
  },
  price: {
    marginHorizontal: 4,
    color: "#FFF",
    fontFamily: "Gabarito",
    fontSize: 12,
    fontWeight: "bold",
  },
});
