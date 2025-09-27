import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";
import productRouter from "./routes/product.route.js";
import couponRouter from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());

app.use(express.json()); // to parse data from body to json

// routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => res.send("Ecommerce server is running...."));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);

  connectDB();
});
