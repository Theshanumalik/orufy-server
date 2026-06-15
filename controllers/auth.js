import { ApiError, asyncHandler } from "../lib/async-handler.js";
import { OTP } from "../lib/lib.js";
import { User } from "../models/User.js";
import { createUserSchema, generateOTPSchema } from "../schemas/user-schema.js";
import jwt from "jsonwebtoken"

export const createNewUser = asyncHandler(
  async (req, res, next) => {
    const data = createUserSchema.parse(req.body);

    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { phoneNumber: data.phoneNumber },
      ],
    });

    if (existingUser) {
      return next(
        new ApiError(
          409,
          false,
          "User already exists"
        )
      );
    }

    const user = await User.create(data);

    return res.status(201).json({
      success: true,
      data: user,
    });
  }
);

export const generateOTP = asyncHandler(
  async (req, res, next) => {
    const data = generateOTPSchema.parse(req.body);
    const user = await User.findOne(data);

    if (!user) {
      return next(
        new ApiError(404, false, "Incorrect Email or Number!")
      )
    }

    user.otp.token = OTP();
    user.otp.expiredAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await user.save();

    console.log("TOKEN For USER", user.otp.token);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        otp: user.otp.token
      }
    });
  })

export const verifyOTP = asyncHandler(
  async (req, res, next) => {
    const token = req.body.otp;
    if (!token.toString().length == 6) {
      return next(
        new ApiError(401, false, "Invalid OTP!")
      )
    }
    const user = await User.findById(req.body.user);

    if (
      !user || !user.otp.expiredAt || !user.otp.token
    ) {
      return next(
        new ApiError(401, false, "Something went wrong!")
      )
    }

    if (user.otp.expiredAt < Date.now()) {
      return next(
        new ApiError(401, false, "OTP expired!")
      )
    }

    if (user.otp.token != token) {
      return next(
        new ApiError(401, false, "Invalid OTP!")
      )
    }

    user.otp.expiredAt = undefined;
    user.otp.token = undefined;

    await user.save();

    const tokenPayload = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user._id
    }

    const jwt_token = jwt.sign(tokenPayload, process.env.JWT_TOKEN, {
      expiresIn: '1d'
    })

    res
      .status(200)
      .cookie("token", jwt_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        data: { ...tokenPayload }
      });
  })

export const getUser = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(
        new ApiError(401, false, "Something went wrong!")
      )
    }

    const tokenPayload = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user._id
    }
    res
      .status(200)
      .json({
        success: true,
        data: { ...tokenPayload }
      });
  })

