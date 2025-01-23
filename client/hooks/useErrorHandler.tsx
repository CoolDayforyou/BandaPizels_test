import { ErrorType } from "@/types/Types";
import { AxiosError, isAxiosError } from "axios";

export const useErrorHandler = (err: unknown) => {
  if (isAxiosError(err)) {
    const error: AxiosError<ErrorType> = err;
    return error.response?.data.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong... Please, try again later.";
};
