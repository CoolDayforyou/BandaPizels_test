export type LoginType = {
  username: string;
  password: string;
};

export type AuthContextType = {
  isLogged: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
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
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { count: number; rate: number };
};

type Status = {
  loading: boolean;
  errorMessage: string | undefined;
};

export type LoginStatus = Status;
