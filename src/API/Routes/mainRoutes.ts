import express from "express";
import authRoutes from "./auth/AuthRoutes";
import authLocalRoutes from "./auth/passportRoutes/LocalLoginRoutes";
import userActionsRoutes from "./user/userRoutes"

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1" , authRoutes)
apiRoutes.use("/api/v1/local" , authLocalRoutes)
apiRoutes.use("/api/v1/user" , userActionsRoutes)
