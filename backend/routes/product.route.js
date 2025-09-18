import express from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category:category", getProductsByCategory);
router.get("/recommendation", getRecommendedProducts);
router.post("/", createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router;
