import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCoupon, ValidateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, ValidateCoupon);

export default router;
