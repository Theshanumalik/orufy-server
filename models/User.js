import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      expiredAt: {
        type: Date,
        required: function() {
          return this.otp.token
        }
      },
      token: {
        type: String,
        maxLength: 6
      }
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
