
//message , status code , error code , details

export class HttpExceptions extends Error {
    message: string
    errorCode : ErrorCode
    errorStatus : number    
    details : any

    constructor(message : string, errorCode : ErrorCode 
        , errorStatus : number , details : any) {
        super(message)
        this.message = message
        this.errorStatus = errorStatus
        this.errorCode = errorCode
        this.details = details
    }
}

export enum ErrorCode {
    USER_ALREADY_EXIST = 1001,
    USER_NOT_FOUND = 1002,
    PASSWORD_NOT_REPEATED_PASSWORD = 1003,
    OTP_NOT_VALID = 1004,
    NOT_ABLE_SEND_EMAIL = 1005,
    EXPIRED_DATE = 1006,
    SERVER_ERROR = 1007,
    ZOD_INVALID_DATA = 1008,
    USER_NOT_AUTHONTICATED = 1009
}