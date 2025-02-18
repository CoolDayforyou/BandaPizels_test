import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { ProductType } from "@/types/Types";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Routes } from "@/constants/Routes";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  const backgroundColor = useThemeColor("touchable");
  const textColor = useThemeColor("text");

  const handlePress = () => {
    router.push(`${Routes.PRODUCTS}/${product.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          backgroundColor,
        },
      ]}
      onPress={handlePress}
    >
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <Text
        numberOfLines={1}
        style={[
          styles.titleText,
          {
            color: textColor,
          },
        ]}
      >
        {product.title}
      </Text>

      <Text
        style={[
          styles.price,
          {
            color: textColor,
          },
        ]}
      >
        ${product.price.toFixed(2)}
      </Text>
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
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
  },
  titleText: {
    marginHorizontal: 4,
    marginVertical: 8,
    fontFamily: Fonts.Alata,
    fontSize: 12,
  },
  price: {
    marginHorizontal: 4,
    fontFamily: Fonts.Gabarito,
    fontSize: 12,
    fontWeight: "bold",
  },
});
