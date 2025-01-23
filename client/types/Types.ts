export type LoginType = {
  username: string;
  password: string;
};

type ResponseType = {
  success: boolean;
};

export type ErrorType = ResponseType & {
  message: string;
};

export type DataType<T, Key extends string = "data"> = ResponseType & {
  [K in Key]: T;
};

export type ProductType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
};

type Status = {
  loading: boolean;
  errorMessage: string | undefined;
};

export type LoginStatus = Status;
