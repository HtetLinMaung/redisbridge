import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import isAuth from "../../../../utils/is-auth";
import { getRedis } from "../../../../utils/redis";
import isJSONParsable from "../../../../utils/is-json-parsable";

export default brewBlankExpressFunc(async (req, res) => {
  const method = req.method.toLowerCase();
  if (method != "post") {
    return res.sendStatus(404);
  }
  isAuth(req);

  const { keys } = req.body;

  // Check if keys are provided
  if (!keys || keys.length === 0) {
    throwErrorResponse(400, "Keys are required");
  }

  const redis = getRedis();
  const values = await redis.mget(keys);

  // Create a key-value map
  const data = keys.reduce((result: any, key: string, index: number) => {
    result[key] =
      values[index] && isJSONParsable(values[index])
        ? JSON.parse(values[index])
        : values[index];
    return result;
  }, {});

  res.json({
    code: 200,
    message: "",
    data,
  });
});
