import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import stripeClient from "../../Services/Billing/client";

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SIGN_KEY;

export function StripeWebHookSign()
{
    return (request: Request, response: Response, next: NextFunction) => {
        if (stripeWebhookSecret) {
            const signature = request.headers['stripe-signature'];
            try {                
              const event = stripeClient.webhooks.constructEvent(
                request.body,
                signature?? "",
                stripeWebhookSecret
              );
              request.stripeEvent = event;
              next();
            } catch (err) {
              console.log(`⚠️  Webhook signature verification failed.`, err);
              return response.sendStatus(400);
            }
        }
    }
}