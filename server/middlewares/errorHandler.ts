import { ErrorRequestHandler } from "express";
import { CustomError } from "../utils/CustomError";
import { ResponseErrorType } from "../types/response";
import { isAxiosError } from "axios";

export const errorHandler: ErrorRequestHandler<{}, ResponseErrorType> = (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (isAxiosError(error)) {
    res.status(error.status || 502).json({
      success: false,
      message: error.response?.data || error.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error.",
  });
};
