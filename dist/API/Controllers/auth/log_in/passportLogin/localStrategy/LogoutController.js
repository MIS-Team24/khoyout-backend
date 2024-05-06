"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const badServer_1 = require("../../../../../Exceptions/badServer");
const main_1 = require("../../../../../Exceptions/main");
const badAuthontication_1 = require("../../../../../Exceptions/badAuthontication");
const logoutHandler = async (req, res, next) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                return next(new badServer_1.BadServerException("Internal server error!", main_1.ErrorCode.SERVER_ERROR, err));
            }
            return res.json({
                success: true,
                message: "user logged out successfully"
            });
        });
    }
    else {
        return next(new badAuthontication_1.BadAuthonticationException("User not authonticated!", main_1.ErrorCode.USER_NOT_AUTHONTICATED, { isAuth: false }));
    }
};
exports.logoutHandler = logoutHandler;
