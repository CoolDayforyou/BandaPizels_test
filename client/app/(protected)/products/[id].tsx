import { useLocalSearchParams } from "expo-router";
import SingleProductScreen from "@/screens/SingleProductScreen";

const Product = () => {
  const { id } = useLocalSearchParams();

  return <SingleProductScreen productId={id} />;
};

export default Product;
