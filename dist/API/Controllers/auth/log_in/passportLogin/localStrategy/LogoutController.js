"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const main_1 = require("../../../../../Exceptions/main");
const ErrorTemplate_1 = require("../../../../../../Services/responses/ErrorTemplate");
const Messages_1 = require("../../../../../../Services/responses/Messages");
const badServer_1 = require("../../../../../Exceptions/badServer");
const badAuthontication_1 = require("../../../../../Exceptions/badAuthontication");
const logoutHandler = async (req, res, next) => {
    if (req.user) {
        req.logout((error) => {
            if (error) {
                return res.status(main_1.ResStatus.I_SERVER_ERROR).json((0, ErrorTemplate_1.errorResponseTemplate)(new badServer_1.BadServerException(Messages_1.Messages.SERVER_ERROR, main_1.ErrorCode.SERVER_ERROR, { error, authonticated: false })));
            }
            return res.json({
                authonticated: true,
                message: Messages_1.Messages.USER_LOGGED_OUT
            });
        });
    }
    else {
        return res.status(main_1.ResStatus.UNAUTHORIZED).json((0, ErrorTemplate_1.errorResponseTemplate)(new badAuthontication_1.BadAuthonticationException(Messages_1.Messages.USER_NOT_AUTHONTICATED, main_1.ErrorCode.USER_NOT_AUTHONTICATED, { authonticated: false })));
    }
};
exports.logoutHandler = logoutHandler;
