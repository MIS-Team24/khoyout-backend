import express from "express";
import authRoutes from "./auth/AuthRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1", authRoutes)