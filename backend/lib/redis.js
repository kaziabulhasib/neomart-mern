import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

// Logging
// redis.on("connect", () => console.log("✅ Redis client connected"));
// redis.on("ready", () => console.log("✅ Redis client ready to use"));
// redis.on("end", () => console.log("❌ Redis client disconnected"));

redis.on("error", (err) => console.error("❌ Redis client error:", err));

const connectRedis = async () => {
  try {
    await redis.connect();
    console.log("🚀 Redis connection established");
  } catch (err) {
    console.error("❌ Could not connect to Redis:", err);
  }
};

connectRedis();
