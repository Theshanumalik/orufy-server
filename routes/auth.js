import { Router } from "express";
import { createNewUser, generateOTP, getUser, verifyOTP } from "../controllers/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.route('/generateOtp').post(generateOTP)
router.route('/verifyOTP').post(verifyOTP)
router.route('/create').post(createNewUser)
router.route('/user').get(authorize, getUser)

export default router;
