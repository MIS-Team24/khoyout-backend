import { ErrorCode, ResStatus, HttpExceptions } from "./main";

export class BadServerException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details? : any) {
        super(message ,  errorCode , ResStatus.I_SERVER_ERROR, details)
    }
}