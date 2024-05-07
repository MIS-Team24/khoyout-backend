import { ErrorCode, ErrorStatus, HttpExceptions } from "./main";

export class BadServerException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details : any) {
        super(message ,  errorCode , ErrorStatus.SERVER_ERROR , details)
    }
}