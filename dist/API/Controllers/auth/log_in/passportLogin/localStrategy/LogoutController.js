"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const main_1 = require("../../../../../Exceptions/main");
const logoutHandler = async (req, res, next) => {
    if (req.user) {
        req.logout((error) => {
            if (error) {
                const responeError = {
                    error: {
                        message: "Internal server error!",
                        errorCode: main_1.ErrorCode.SERVER_ERROR,
                        errorStatus: main_1.ErrorStatus.SERVER_ERROR,
                        details: { error, isAuth: false }
                    }
                };
                return res.json(responeError);
            }
            return res.json({
                success: true,
                isAuth: true,
                message: "user logged out successfully"
            });
        });
    }
    else {
        const responeError = {
            error: {
                message: "User not authonticated!",
                errorCode: main_1.ErrorCode.USER_NOT_AUTHONTICATED,
                errorStatus: main_1.ErrorStatus.UNAUTHORIZED,
                details: { isAuth: false }
            }
        };
        return res.json(responeError);
    }
};
exports.logoutHandler = logoutHandler;
