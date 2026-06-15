const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    sellingPrice: {
      type: Number,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    brand: {
      type: String
    },

    returnEligible: {
      type: Boolean,
      default: true
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)
