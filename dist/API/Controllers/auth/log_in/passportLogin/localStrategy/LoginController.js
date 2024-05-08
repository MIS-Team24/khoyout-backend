"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = exports.localLoginHandler = void 0;
const passport_1 = __importDefault(require("passport"));
const passportLocalStrategy_1 = require("../../../../../../Services/passportAuth/passportLocalStrategy");
const main_1 = require("../../../../../Exceptions/main");
const Messages_1 = require("../../../../../../Services/responses/Messages");
const ErrorTemplate_1 = require("../../../../../../Services/responses/ErrorTemplate");
const badRequest_1 = require("../../../../../Exceptions/badRequest");
(0, passportLocalStrategy_1.initializePassport)(passport_1.default);
const localLoginHandler = (req, res, next) => {
    return passport_1.default.authenticate('local', (error, user, info) => {
        if (error) {
            let errRsponse = error;
            return res.status(errRsponse.error.errorStatus).json(error);
        }
        if (!user) {
            return res.status(main_1.ResStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_NOT_FOUND, main_1.ErrorCode.USER_NOT_FOUND)));
        }
        req.logIn(user, (error) => {
            if (error) {
                let errRsponse = error;
                return res.status(errRsponse.error.errorStatus).json(error);
            }
            //the user form returned according to the frontent desire
            let userReturnedToFront = {
                email: user?.email,
                emailActivated: user?.emailActivated,
                createdAt: user?.createdAt,
                fullName: user?.fullName,
                phone: user?.phone
            };
            //
            return res.json({
                message: Messages_1.Messages.USER_LOGGED_IN,
                user: userReturnedToFront
            });
        });
    })(req, res, next);
};
exports.localLoginHandler = localLoginHandler;
exports.passportLocal = passport_1.default;
