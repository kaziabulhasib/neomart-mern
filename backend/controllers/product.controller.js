import { json } from "express";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log("error in get all products", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch it from mongodb

    featuredProducts = await Product.find({ isFeatured: true }).lean(); // lean --> js obj instead of mongo obj

    if (!featuredProducts) {
      return res
        .status(404)
        .json({ message: "no featured product found on db" });
    }

    // store in redis for feature quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("error in getting featured products", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
