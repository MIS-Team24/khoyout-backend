import { ErrorCode, ErrorStatus, HttpExceptions } from "./main";

export class BadRequestException extends HttpExceptions {
    constructor(message : string , errorCode : ErrorCode , details : any) {
        super(message ,  errorCode , ErrorStatus.BAD_REQUEST , details)
    }
}