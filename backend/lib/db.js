import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("Database connected", process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("mongodb connection error ", error);
    process.exit(1);
  }
};
