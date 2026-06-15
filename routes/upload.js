import express from "express";
import { upload } from "../middlewares/multer.js";
import { uploadImages } from "../controllers/upload.js";

const router = express.Router();

router.route('/').post(
  upload.array("images", 10),
  uploadImages
);

export default router;
