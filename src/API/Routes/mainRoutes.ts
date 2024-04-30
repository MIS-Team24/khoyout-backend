import express from "express";
import authRoutes from "./auth/auth";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1", authRoutes)