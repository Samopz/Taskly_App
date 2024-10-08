import redis from "redis";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("connect", () => {
  console.log("Redis client connected to the Redis-Cloud server!".bgMagenta);
});

export default client;
