import { throwErrorResponse } from "code-alchemy";
import { Request } from "express";

export default function isAuth(req: Request) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    throwErrorResponse(403, "Unauthorized");
  }
}
