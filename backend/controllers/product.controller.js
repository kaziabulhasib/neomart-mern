import { json } from "express";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
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

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("error on creating product", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted from cloudinary");
      } catch (error) {
        console.log("error in deleting image from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    console.log("error in deleting product", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
