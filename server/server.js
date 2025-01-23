const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

//DOTENV
dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/products", require("./routes/productRoutes"));

//PORT
const PORT = process.env.PORT || 3000;

// LISTEN
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
