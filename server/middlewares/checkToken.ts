import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const checkToken = (
  req: Request & { token?: string },
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  const authToken = req.headers["authorization"];

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return next(new CustomError("Unauthorized user", 401));
  }

  token = authToken.split(" ")[1];

  if (!token) {
    return next(new CustomError("Unauthorized User", 401));
  }

  req.token = token;

  next();
};

export default checkToken;
