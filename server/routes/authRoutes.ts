import express from "express";
import { loginController } from "../controllers/userController";
import { body } from "express-validator";

// ROUTER OBJ
const router = express.Router();

// LOGIN VALIDATION
const loginValidationChain = (field: string) =>
  body(field)
    .isString()
    .withMessage(`${field} must be a string!`)
    .notEmpty()
    .withMessage(`${field} must have a value!`);

// ROUTES
router.post(
  "/login",
  [loginValidationChain("username"), loginValidationChain("password")],
  loginController,
);

export default router;
