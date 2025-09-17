import express from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router;
