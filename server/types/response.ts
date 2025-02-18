type ResponseType = {
  success: boolean;
};

export type ResponseDataType<T, Key extends string = "data"> = ResponseType & {
  [K in Key]: T;
};

export type ResponseErrorType = ResponseType & {
  message: string;
};
