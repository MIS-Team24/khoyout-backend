import express from "express";
import authRoutes from "./auth/AuthRoutes";
import authLocalRoutes from "./auth/passportRoutes/LocalLoginRoutes";
import userActionsRoutes from "./user/userRoutes"
import designerRoutes from './designer/designerRoutes';

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1" , authRoutes)
apiRoutes.use("/api/v1/local" , authLocalRoutes)
apiRoutes.use("/api/v1/user" , userActionsRoutes)
apiRoutes.use("/api/v1/designer" , designerRoutes)