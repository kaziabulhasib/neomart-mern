import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCoupon, ValidateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.get("/validate", protectRoute, ValidateCoupon);

export default router;
