import { ErrorCode, ResStatus, HttpExceptions } from "./main";

export class BadValidationException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details? : any) {
        super(message ,  errorCode , ResStatus.BAD_REQUEST , details)
    }
}