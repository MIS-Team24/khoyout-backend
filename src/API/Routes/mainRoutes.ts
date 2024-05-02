import express from "express";
import authRoutes from "./auth/AuthRoutes";
import otpRoutes from "./auth/OtpRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1" , authRoutes)
apiRoutes.use("/api/v1/otp" , otpRoutes)