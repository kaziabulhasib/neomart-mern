import express from "express";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/create-checkout-session", protectRoute , createCheckoutSession);
router.get("/checkout-success", protectRoute, checkoutSuccess);

export default router;
