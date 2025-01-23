import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useGetSingleProduct } from "@/hooks/useGetData";
import { ProductType } from "@/types/Types";
import Loading from "@/components/Loading";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  productId: string;
};

const SingleProductScreen = ({ productId }: Props) => {
  const router = useRouter();

  const [errorMess, setErrorMess] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<ProductType | null>(null);

  const { isLoading, isLogged, productData, errorMessage } =
    useGetSingleProduct(productId);

  useEffect(() => {
    if (!isLogged && !isLoading) {
      return router.push("/");
    }

    if (errorMessage) {
      return setErrorMess(errorMessage);
    }

    setProduct(productData);
  }, [isLoading, isLogged, productData, errorMessage]);

  if (isLoading) {
    return <Loading />;
  }
  if (!product) {
    return (
      <Text style={styles.error}>
        {errorMess ? errorMess : "This product doesn't exist!"}
      </Text>
    );
  }

  const handlePressReturn = () => {
    return router.push("/products");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Return icon */}
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity onPress={handlePressReturn}>
          <AntDesign
            name="leftcircle"
            size={40}
            color={Colors.touchableColor}
          />
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
            <Text style={styles.titleText}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          {/* Product secondary info */}
          <View style={styles.description}>
            {/* Product description */}
            <Text style={styles.infoText}>{product.description}</Text>

            {/* Shipping & Returns */}
            <View
              style={{
                gap: 12,
              }}
            >
              <Text style={styles.titleText}>Shipping & Returns</Text>
              <Text style={styles.infoText}>
                Free standard shipping and free 60-day returns
              </Text>
            </View>

            {/* Reviews */}
            <View
              style={{
                gap: 16,
              }}
            >
              <Text style={styles.titleText}>Reviews</Text>

              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: 24,
                  },
                ]}
              >
                {product.rating.rate} Ratings
              </Text>

              <Text style={styles.infoText}>
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
    backgroundColor: Colors.backgroundColor,
  },
  scrollContainer: {
    paddingVertical: 63,
    gap: 12,
  },
  error: {
    color: "#FFF",
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
    color: "#FFF",
    fontFamily: "Alata",
    fontSize: 16,
  },
  price: {
    color: Colors.accentColor,
    fontFamily: "Gabarito",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    gap: 24,
  },
  infoText: {
    color: Colors.secondaryColor,
    fontSize: 12,
    lineHeight: 12 * 1.6,
  },
});
