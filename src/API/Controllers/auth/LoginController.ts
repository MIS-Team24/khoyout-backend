import { Request, Response } from "express";
import { LoginBody } from "../../types/auth/auth";
import 'dotenv/config';

export function loginHandler(req: Request, res: Response)
{
    const loginBody = req.body as LoginBody;

    res.status(200).send("login");
}