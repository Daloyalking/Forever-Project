import express from "express";
import {
  resendOtp,
  resetOtp,
  verifyReset,
  verifyResetPassword,
} from "../Controller/authController.js";

const authRoute = express.Router();

authRoute.post("/reset-otp", resetOtp);
authRoute.post("/otp-reset", verifyReset);
authRoute.post("/verify-password", verifyResetPassword);
authRoute.post("/resend-otp", resendOtp);


export default authRoute;
