import { useLocalSearchParams } from "expo-router";
import SingleProductScreen from "@/screens/SingleProductScreen";

const Product = () => {
  const { productId } = useLocalSearchParams();

  return <SingleProductScreen productId={productId} />;
};

export default Product;
