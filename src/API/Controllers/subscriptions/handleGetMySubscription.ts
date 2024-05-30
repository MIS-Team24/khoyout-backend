import { Request, Response } from "express";
import { getDesignerSubscriptionTier } from "../../Models/DesignerModel";

export async function handleGetMySubscription(req: Request, res: Response)
{
    try
    {
        const designer = req.user;
        if (!designer) {
            return res.sendStatus(404);
        }
        const plan = await getDesignerSubscriptionTier(designer.id);
        return res.status(200).json({plan: plan?? "None"});
    } catch (Error) {
        return res.sendStatus(500);
    }
}