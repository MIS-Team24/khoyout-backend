import { UserBody } from "./src/API/types/auth";
import Stripe from "stripe";

declare global {

declare namespace Express {
    export interface Request {
       user?: UserBody,
       stripeEvent?: Stripe.Event
    }
 }
}