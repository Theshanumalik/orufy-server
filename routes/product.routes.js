import express from "express";
import { changePublished, createNewProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/product.js";
import { authorize } from "../middlewares/authorize.js"

const router = express.Router();

router.use(authorize);
router.route('/').post(createNewProduct).get(getAllProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);
router.route('/publish/:id').put(changePublished)

export default router;
