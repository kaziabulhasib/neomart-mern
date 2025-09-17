import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "no access token found" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res.status(401).json({ message: "token expired" });
      }
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
    console.log("error in protect route", error);
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "access denied - admin only " });
  }
};
