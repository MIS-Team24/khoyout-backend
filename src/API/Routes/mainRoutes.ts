import express from "express";
import authRoutes from "./auth/AuthRoutes";
import authLocalRoutes from "./auth/passportRoutes/LocalLoginRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1" , authRoutes)
apiRoutes.use("/api/v1/local" , authLocalRoutes)
