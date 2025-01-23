const express = require("express");
const {
  getAllProductsController,
  getSingleProductsController,
} = require("../controllers/productController");
const checkToken = require("../middlewares/checkToken");

// ROUTER OBJ
const router = express.Router();

// ROUTES

router.get("/", checkToken, getAllProductsController);
router.get("/:productId", checkToken, getSingleProductsController);

module.exports = router;
