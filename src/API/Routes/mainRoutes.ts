import express from "express";
import authRoutes from "./auth/AuthRoutes";
import authLocalRoutes from "./auth/passportRoutes/LocalLoginRoutes";
import userActionsRoutes from "./user/userRoutes"
import designerRoutes from './designer/designerRoutes';
import notifications from "./notification/notificationsRoutes";
import appointments from "./booking/booking";
import webhookRoutes from "./webhooks/webhookRoutes";
import paymentRoutes from "./payments/paymentRoutes";
import subscriptionRoutes from "./subscriptions/subscriptionsRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1/auth", express.json(), authRoutes);
apiRoutes.use("/api/v1/local", express.json(), authLocalRoutes);
apiRoutes.use("/api/v1/user", express.json(), userActionsRoutes);
apiRoutes.use("/api/v1/notifications", express.json(), notifications);
apiRoutes.use("/api/v1/appointments", express.json(), appointments);
apiRoutes.use("/api/v1/designer", express.json(), designerRoutes)
apiRoutes.use("/api/v1/payment", express.json(), paymentRoutes);
apiRoutes.use("/api/v1/subscriptions", express.json(), subscriptionRoutes);


apiRoutes.use("/api/v1/webhook", express.raw({type: "application/json"}), webhookRoutes);