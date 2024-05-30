import { prisma } from "../../Database";

export async function createPaymentSession(designerId: string, checkoutSessionId: string, checkoutUrl: string) : Promise<boolean>
{
    try
    {
        await prisma.checkoutSession.create({
            data: {
                id: checkoutSessionId,
                checkoutUrl: checkoutUrl,
                designerId: designerId,
            },
        });
        return true;
    } catch (error) {
        console.log("ERROR CREATING PAYMENT SESS");
        console.log(error);
        return false;
    }
}