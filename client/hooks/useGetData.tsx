import client from "@/api/client";
import { checkToken } from "@/lib/checkToken";
import { DataType, ProductType } from "@/types/Types";
import { useEffect, useState } from "react";
import { useErrorHandler } from "./useErrorHandler";

const useGetProducts = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productsArray, setProductsArray] = useState<ProductType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const token = await checkToken();
        if (!token) {
          return;
        }

        setIsLogged(true);

        const { data } = await client.get<DataType<ProductType[], "products">>(
          "/products",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        setProductsArray(data.products);
      } catch (error) {
        const errorMessage = useErrorHandler(error);
        setErrorMessage(errorMessage);
      }

      setIsLoading(false);
    };

    getProductsData();
  }, []);

  return { isLoading, isLogged, productsArray, errorMessage };
};

const useGetSingleProduct = (productId: string) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const getProductData = async () => {
      try {
        const token = await checkToken();
        if (!token) {
          return;
        }

        setIsLogged(true);
        const { data } = await client.get<DataType<ProductType, "product">>(
          `/products/${productId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        setProductData(data.product);
      } catch (error) {
        const errorMessage = useErrorHandler(error);
        setErrorMessage(errorMessage);
      }

      setIsLoading(false);
    };

    getProductData();
  }, []);

  return { isLoading, isLogged, productData, errorMessage };
};

export { useGetProducts, useGetSingleProduct };
