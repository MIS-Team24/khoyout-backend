import { getDesignerBaseAccountByEmail } from "../../API/Models/DesignerModel";
import { prisma } from "../../Database";

export async function grantDesignerPremium(email: string, premium: "STANDARD" | "PREMIUM")
{
    const designer = await getDesignerBaseAccountByEmail(email);
    if (!designer) return;
    
    await prisma.premiumSubscription.upsert({
        create: {
            designerId: designer.baseAccount.id,
            subscriptionType: premium
        },
        update: {
            designerId: designer.baseAccount.id,
            subscriptionType: premium
        },
        where: {
            designerId: designer.baseAccount.id
        }
    });
}

export async function revokeDesignerPremium(designerId: string)
{
    await prisma.premiumSubscription.deleteMany({
        where: {
            designerId: designerId
        }
    });
}