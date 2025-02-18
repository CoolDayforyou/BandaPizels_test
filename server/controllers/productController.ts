import { NextFunction, Request, Response } from "express";
import client from "../config/api";
import { ResponseDataType } from "../types/response";
import { ProductTypeDTO } from "../types/dtos/Product.dto";
import { CustomError } from "../utils/CustomError";
import { isDataObject } from "../utils/typeGuards";

const getAllProductsController = async (
  req: Request & { token?: string },
  res: Response<ResponseDataType<ProductTypeDTO[], "products">>,
  next: NextFunction,
) => {
  const token = req.token;

  try {
    if (!token) {
      return next(new CustomError("Unauthorized user!", 401));
    }

    const { data }: { data: ProductTypeDTO[] } = await client.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(data)) {
      res.status(200).json({ success: true, products: data });
    } else {
      throw new CustomError("Products not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

const getSingleProductsController = async (
  req: Request<{
    productId: string;
  }> & { token?: string },
  res: Response<ResponseDataType<ProductTypeDTO, "product">>,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const token = req.token;

  try {
    if (!token) {
      return next(new CustomError("Unauthorized user!", 401));
    }

    const { data }: { data: ProductTypeDTO } = await client.get(
      `/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!isDataObject(data) || Object.keys(data).length === 0) {
      return next(new CustomError("This product doesn't exist :(", 404));
    }

    res.status(200).json({
      success: true,
      product: data,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllProductsController, getSingleProductsController };
