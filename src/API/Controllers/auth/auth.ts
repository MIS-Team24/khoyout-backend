import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../../types/auth/auth";
import { prisma } from "../../../Database";

export function loginHandler(req: Request, res: Response)
{
    const loginBody = req.body as LoginBody;

    res.status(200).send("login");
}

export function RegisterHandler(req: Request, res: Response)
{
    const registerBody = req.body as RegisterBody;

    res.status(200).send("register");
}