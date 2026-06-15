import { ApiError } from "../lib/async-handler.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const handleApiError = (
  error,
  req,
  res,
  next
) => {
  console.log(error)
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Invalid input",
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof jwt.TokenExpiredError) {
    return res.status(403).json({
      success: false,
      message: "Access forbidden"
    })
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
