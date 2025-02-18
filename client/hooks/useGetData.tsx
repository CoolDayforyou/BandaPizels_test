import { useEffect, useState } from "react";
import { protectedRoute } from "@/api/client";
import { DataType, ProductType } from "@/types/Types";
import { useErrorHandler } from "./useErrorHandler";
import { useAuth } from "./useAuth";
import { getToken } from "@/utils/storage";

const useGetProducts = () => {
  const { isLogged } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [productsArray, setProductsArray] = useState<ProductType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      const token = await getToken();
      if (!token) {
        setProductsArray([]);
        setErrorMessage("You are not authorized!");
        setIsLoading(false);

        return;
      }

      try {
        const { data } = await protectedRoute.get<
          DataType<ProductType[], "products">
        >("/products", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setProductsArray(data.products);
      } catch (error) {
        setErrorMessage(useErrorHandler(error));
      }

      setIsLoading(false);
    };

    getProductsData();
  }, [isLogged]);

  return { isLoading, isLogged, productsArray, errorMessage };
};

const useGetSingleProduct = (productId: string) => {
  const { isLogged } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const getProductData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setIsLoading(false);
          setProductData(null);
          setErrorMessage("You are not authorized!");

          return;
        }

        const { data } = await protectedRoute.get<
          DataType<ProductType, "product">
        >(`/products/${productId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setProductData(data.product);
      } catch (error) {
        const errorMessage = useErrorHandler(error);
        setErrorMessage(errorMessage);
      }

      setIsLoading(false);
    };

    getProductData();
  }, [productId, isLogged]);

  return { isLoading, isLogged, productData, errorMessage };
};

export { useGetProducts, useGetSingleProduct };
