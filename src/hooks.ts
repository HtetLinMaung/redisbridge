import { log } from "starless-logger";
import { connectRedis } from "./routes/utils/redis";

export const afterWorkerStart = async () => {
  log("after worker started");
  connectRedis();
};
