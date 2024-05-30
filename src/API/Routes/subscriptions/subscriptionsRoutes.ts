import express from "express";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { UserType } from "../../types/user";
import { handleGetMySubscription } from "../../Controllers/subscriptions/handleGetMySubscription";


const router = express.Router();

router.get("/my-plan", checkIfAuthenticated(UserType.Designer), handleGetMySubscription);

export default router;