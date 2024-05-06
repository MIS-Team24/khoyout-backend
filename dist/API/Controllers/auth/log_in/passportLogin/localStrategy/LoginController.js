"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = exports.localLoginHandler = void 0;
const passport_1 = __importDefault(require("passport"));
const passportLocalStrategy_1 = require("../../../../../../Services/passportAuth/passportLocalStrategy");
const main_1 = require("../../../../../Exceptions/main");
(0, passportLocalStrategy_1.initializePassport)(passport_1.default);
const localLoginHandler = (req, res, next) => {
    return passport_1.default.authenticate('local', (error, user, info) => {
        if (error) {
            console.log(error);
            return res.json({ error });
        }
        if (!user) {
            return res.json({
                error: {
                    message: "User not found",
                    errorCode: main_1.ErrorCode.USER_NOT_FOUND,
                    errorStatus: main_1.ErrorStatus.BAD_REQUEST,
                    details: { isLoggedIn: false, success: false }
                }
            });
        }
        req.logIn(user, (error) => {
            if (error) {
                console.log(error);
                return res.json({ error });
            }
            //the user form returned according to the frontent desire
            let userReturnedToFront = {
                id: user?.id,
                email: user?.id,
                emailActivated: user?.emailActivated,
                createdAt: user?.createdAt,
                fullName: user?.fullName,
                phone: user?.phone
            };
            //
            return res.json({
                isLoggedIn: true,
                success: true,
                message: 'User has logged successfully',
                user: userReturnedToFront
            });
        });
    })(req, res, next);
};
exports.localLoginHandler = localLoginHandler;
exports.passportLocal = passport_1.default;
