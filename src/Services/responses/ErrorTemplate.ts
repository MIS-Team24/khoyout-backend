import { ErrorCode, ErrorStatus, HttpExceptions } from "../../API/Exceptions/main"

export interface ErrorResponse {
    message : string,
    errorCode : ErrorCode,
    errorStatus: ErrorStatus,
    details : any
}

export type ErrorResponseType = {
    error : ErrorResponse
}

export const errorResponseTemplate= (error : HttpExceptions) : ErrorResponseType => {
    return {
        error : {
            message: error.message,
            errorCode: error.errorCode,
            errorStatus: error.errorStatus,
            details: error.details,
        }       
    }
}