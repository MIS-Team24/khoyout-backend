import { ErrorCode, HttpExceptions } from "./main";

export class BadServerException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details : any) {
        super(message ,  errorCode , 500 , details)
    }
}