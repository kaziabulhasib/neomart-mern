import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);

  connectDB();
});
