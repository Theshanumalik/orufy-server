import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      required: true,
      enum: [
        "Foods",
        "Electronics",
        "Fashion",
        "Books",
        "Beauty",
        "Home",
        "Sports",
        "Other",
      ],
    },
    quantityStock: {
      type: Number,
      required: true,
      min: 0,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    brandName: {
      type: String,
      trim: true,
    },
    images: [
      String
    ],
    exchangeEligibility: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
