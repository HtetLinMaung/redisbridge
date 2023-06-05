import { brewBlankExpressFunc } from "code-alchemy";
import { getRedis } from "../../../../../utils/redis";
import isAuth from "../../../../../utils/is-auth";

export default brewBlankExpressFunc(async (req, res) => {
  const method = req.method.toLowerCase();
  if (method != "get") {
    return res.sendStatus(404);
  }
  isAuth(req);
  const { key } = req.params;
  const redis = getRedis();
  const value = await redis.get(key);

  res.json({
    code: 200,
    message: "OK",
    data: value && isJSONParsable(value) ? JSON.parse(value) : value,
  });
});
