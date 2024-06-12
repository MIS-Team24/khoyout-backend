import express from "express";
import { onUserPurchaseHandler } from "../../../Controllers/webhooks/payments/onUserPurchase";
import { StripeWebHookSign } from "../../../Middleware/StripeWebhook";

const router = express.Router();

// router.post("/stripe", express.raw({type: "application/json"}), StripeWebHookSign(), onUserPurchaseHandler);
router.post("/stripe", express.raw({type: "application/json"}), onUserPurchaseHandler);

export default router;