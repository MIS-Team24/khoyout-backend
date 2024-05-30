import express from "express";
import stripeRoutes from "./payment/stripe";

const router = express.Router();


router.use("/payment", stripeRoutes);

export default router;