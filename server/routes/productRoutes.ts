import express from "express";
import {
  getAllProductsController,
  getSingleProductsController,
} from "../controllers/productController";
import checkToken from "../middlewares/checkToken";

// ROUTER OBJ
const router = express.Router();

// ROUTES

router.get("/", checkToken, getAllProductsController);
router.get("/:productId", checkToken, getSingleProductsController);

export default router;
