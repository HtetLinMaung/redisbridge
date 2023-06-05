import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import isAuth from "../../../utils/is-auth";
import { getRedis } from "../../../utils/redis";
import { log } from "starless-logger";

export default brewBlankExpressFunc(async (req, res) => {
  const method = req.method.toLowerCase();
  if (method != "post") {
    return res.sendStatus(404);
  }
  isAuth(req);

  const { key, value } = req.body;
  log(req.body);

  // check if key and value are provided
  if (!key || !value) {
    throwErrorResponse(400, "Key and value are required");
  }
  const redis = getRedis();
  await redis.set(
    key,
    typeof value == "string" ? value : JSON.stringify(value)
  );

  res.json({
    code: 200,
    message: "Data saved successfully",
  });
});
