import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(express.json()); // to parse data from body to json

// routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);

  connectDB();
});
