import express from "express";
import { getPaymentInfo } from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/", getPaymentInfo);

export default router;
