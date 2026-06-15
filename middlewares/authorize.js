import jwt from "jsonwebtoken";
import { ApiError, asyncHandler } from "../lib/async-handler.js";

export const authorize = asyncHandler((req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(
      new ApiError(
        401,
        false,
        "Unauthorized"
      )
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_TOKEN
  );

  req.user = decoded;

  next();
});
