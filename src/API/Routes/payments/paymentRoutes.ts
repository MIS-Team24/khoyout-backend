import express from "express";
import { handleDesignerInitiateCheckout } from "../../Controllers/payments/InitiateCheckoutSession";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { UserType } from "../../types/user";

const router = express.Router();

router.post("/initiate-checkout-session", checkIfAuthenticated(UserType.Designer), handleDesignerInitiateCheckout);

export default router;