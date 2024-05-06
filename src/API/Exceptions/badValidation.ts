import { ErrorCode, HttpExceptions } from "./main";

export class BadValidationException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details : any) {
        super(message ,  errorCode , 400 , details)
    }
}