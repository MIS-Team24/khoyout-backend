import { ErrorCode, ResStatus, HttpExceptions } from "./main";

export class BadAuthonticationException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details? : any) {
        super(message ,  errorCode , ResStatus.UNAUTHORIZED , details)
    }
}