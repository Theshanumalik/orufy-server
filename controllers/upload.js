import { v2 as cloudinary } from "cloudinary"
import { asyncHandler } from "../lib/async-handler.js";
import fs from "fs/promises";

export const uploadImages = asyncHandler(
  async (req, res) => {
    const files = req.files;

    if (
      !files ||
      !Array.isArray(files) ||
      files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      secure: true
    })

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result =
          await cloudinary.uploader.upload(
            file.path,
            {
              folder: "products",
            }
          );

        await fs.unlink(file.path);

        return {
          url: result.secure_url,
          publicId: result.public_id,
        };
      })
    );

    return res.status(200).json({
      success: true,
      images: uploadedImages,
    });
  }
);
