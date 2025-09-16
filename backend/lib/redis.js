import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

redis.on("error", function (err) {
  throw err;
});
await redis.connect();
await redis.set("foo", "barrrrrrrrrrrr");

// Disconnect after usage
// await redis.disconnect();
