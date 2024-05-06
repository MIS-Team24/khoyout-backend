import { Request, Response } from "express";
import {  HttpExceptions } from "../Exceptions/main";

export const errorMidllewareHandler = (error : HttpExceptions , req : Request , res : Response) =>{   
    res.status(error.errorStatus).json({
        error : {
            message : error.message,
            errorCode : error.errorCode,
            errorStatus : error.errorStatus,
            details : error.details
        }
    })
} 