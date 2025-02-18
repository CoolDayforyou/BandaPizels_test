import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();

//DOTENV
dotenv.config();

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

// ERROR HANDLER
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 3000;

// LISTEN
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
