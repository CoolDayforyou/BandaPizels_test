const express = require("express");
const { loginController } = require("../controllers/userController");

// ROUTER OBJ
const router = express.Router();

// ROUTES

router.post("/login", loginController);

module.exports = router;
