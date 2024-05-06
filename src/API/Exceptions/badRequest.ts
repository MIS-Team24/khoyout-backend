import { ErrorCode, HttpExceptions } from "./main";

export class BadRequestException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode) {
        super(message ,  errorCode , 400 , null)
    }
}