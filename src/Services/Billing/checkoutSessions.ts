import axios from "axios";
import stripeClient from "./client";

type sessionCreationReturn = {
    url: string,
    id: string
}

export async function createCheckoutSession(designerId: string, email: string, plan: "standard" | "premium") : Promise<sessionCreationReturn | false>
{
    try {
        const session = await stripeClient.checkout.sessions.create({
            customer_email: email,
            cancel_url: "https://khoyout.live/subscription/"+plan,
            success_url: "https://khoyout.live/",
            mode: "subscription",
            line_items: [
                {
                    quantity: 1,
                    price: plan === "standard"? "price_1PM3LzAhfRAyCnfwKLAYPNcg" : "price_1PM3VsAhfRAyCnfw1S18IJg4"

                }
            ],
            subscription_data:{
                metadata: {
                    designerId: designerId
                },
            },
            metadata: {
                plan: plan.toUpperCase()
            },
        });

        return {
            id: session.id,
            url: session.url?? "Unknown"
        }
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function cancelCheckoutSession(checkoutSessionId: string) : Promise<void>
{
    try
    {
        await stripeClient.checkout.sessions.expire(checkoutSessionId);
    } catch (error) {
        console.log(error);
    }
}