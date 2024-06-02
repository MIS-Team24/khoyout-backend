
export abstract class HttpExceptions extends Error {
    message: string
    errorCode : ErrorCode
    errorStatus : ResStatus    
    details : any

    constructor(message : string, errorCode : ErrorCode 
        , errorStatus : ResStatus , details? : any) {
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
    INVALID_DATA = 1008,   
    USER_NOT_AUTHENTICATED = 1009,
    USER_ALREADY_AUTHENTICATED = 1010,
    INCORRECT_PASSWORD = 1011,
    INVALID_FILE = 1012,
    DESIGNER_NOT_FOUND = 1013,
}

export enum ResStatus {
    I_SERVER_ERROR = 500,
    SERICE_UNAVAILABLE = 503,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAGE_NOT_FOUND = 404,
    FORBIDDEN = 403,
    OK = 200, //default response status
    SOURCE_CREATED = 201,
    NO_CONTENT = 204
}


