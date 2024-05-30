import { Request, Response } from "express";
import { cancelCheckoutSession, createCheckoutSession } from "../../../Services/Billing/checkoutSessions";
import { createPaymentSession } from "../../Models/PaymentModel";

export async function handleDesignerInitiateCheckout(req: Request, res: Response)
{
    try {
        const designer = req.user;
        if (!designer || (designer && !designer.emailActivated)) {
            return res.sendStatus(401);
        }

        let plan = req.body.plan;

        if (typeof plan !== "string") {
            return res.sendStatus(422);
        }        

        plan = plan.toLowerCase();

        if (plan !== "standard" && plan !== "premium") {
            return res.sendStatus(422);
        }
        
        const sessionCreation = await createCheckoutSession(designer.id, designer.email, plan);

        if (!sessionCreation) {
            return res.sendStatus(500);
        }

        const saveCheckoutResult = await createPaymentSession(designer.id, sessionCreation.id, sessionCreation.url);

        if (!saveCheckoutResult) {
            await cancelCheckoutSession(sessionCreation.id);
            return res.sendStatus(500);
        }
        
        res.status(200).json({
            paymentURL: sessionCreation.url
        });
    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}