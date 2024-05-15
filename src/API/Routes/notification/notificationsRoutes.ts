import express from "express";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import BodyValidator from "../../Middleware/BodyValidator";
import { z } from "zod";
import { GetUserNotificationsController, MarkUsersNotificationsAsRead } from "../../Controllers/notifications/notifications";

const router = express.Router();

const markAsReadSchema = z.object({
    ids: z.array(z.number().int())
});

router.get("/list", checkIfAuthenticated(), GetUserNotificationsController);
router.post("/mark-as-read", checkIfAuthenticated(), BodyValidator({schema: markAsReadSchema}), MarkUsersNotificationsAsRead);

export default router;
