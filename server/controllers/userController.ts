import { NextFunction, Request, Response } from "express";
import client from "../config/api";
import { UserLoginDTO } from "../types/dtos/UserLogin.dto";
import { ResponseDataType } from "../types/response";
import { CustomError } from "../utils/CustomError";
import { isDataObject } from "../utils/typeGuards";
import { validationResult } from "express-validator";

const loginController = async (
  req: Request<{}, {}, UserLoginDTO>,
  res: Response<ResponseDataType<string | null, "token">>,
  next: NextFunction,
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result
      .array()
      .map((err) => err.msg)
      .join(" \n");

    next(new CustomError(errors, 400));
  }

  try {
    const { password, username } = req.body;

    const { data } = await client.post("/auth/login", {
      username,
      password,
    });

    if (isDataObject<{ token: string }>(data)) {
      res.status(200).json({ success: true, token: data.token });
      return;
    } else {
      throw new CustomError("User not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

export { loginController };
