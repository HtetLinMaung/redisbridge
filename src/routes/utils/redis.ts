import Redis from "ioredis";
import { log } from "starless-logger";

let redis: Redis = null;

export function connectRedis() {
  const { REDIS_CONNECTION_STRING } = process.env;

  // Create a new Redis instance
  redis = new Redis(REDIS_CONNECTION_STRING || "redis://localhost:6379");
  log("redis connected");
  return redis;
}

export function getRedis() {
  if (!redis) {
    connectRedis();
  }
  return redis;
}
