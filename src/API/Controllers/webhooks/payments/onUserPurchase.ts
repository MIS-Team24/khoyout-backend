import { Request, Response } from "express";
import { grantDesignerPremium, revokeDesignerPremium } from "../../../../Services/Subscriptions/manageSubscriptions";
import { deployNotification } from "../../../Models/Notifications";
import { getDesignerBaseAccountByEmail } from "../../../Models/DesignerModel";

export async function onUserPurchaseHandler(req: Request, res: Response)
{
    console.log("1 stripe");
    console.log(req.stripeEvent);
    if (!req.stripeEvent) {
        return;
    }
    console.log("2 stripe");

    try {
        switch (req.stripeEvent.type) {
            case "checkout.session.completed": {
                console.log("User Paid");
                const StripeEvent = req.stripeEvent;

                const bodyData = StripeEvent.data.object;
                const payerEmail = bodyData.customer_email;

                const PlanType = bodyData.metadata?.plan;

                if (payerEmail && PlanType) {
                    await grantDesignerPremium(payerEmail, PlanType === "STANDARD"? "STANDARD" : "PREMIUM");
                    const designerAccount = await getDesignerBaseAccountByEmail(payerEmail);
                    if (designerAccount) {
                        await deployNotification({from: "System", notification: "PremiumGranted"}, designerAccount.baseAccount.id, {}, undefined)
                    }
                    res.sendStatus(200);
                }
                break;
            }
            case "customer.subscription.deleted": {
                console.log("user lost payment");
                const StripeEvent = req.stripeEvent;
                const designerId = StripeEvent.data.object.metadata.designerId;

                if (designerId) {                    
                    await revokeDesignerPremium(designerId);
                    await deployNotification({from: "System", notification: "PremiumExpired"}, designerId, {}, undefined);
                }
                res.sendStatus(200);
                break;
            }
            default: {
                res.sendStatus(500);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
}