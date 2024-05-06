"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = exports.localLoginHandler = void 0;
const passport_1 = __importDefault(require("passport"));
const passportLocalStrategy_1 = require("../../../../../../Services/passportAuth/passportLocalStrategy");
(0, passportLocalStrategy_1.initializePassport)(passport_1.default);
const localLoginHandler = (req, res, next) => {
    return passport_1.default.authenticate('local', (error, user, info) => {
        if (error) {
            console.log(error);
            return res.json({
                errorLocate: 'user',
                isLogged: false,
                error: error.message
            });
        }
        if (!user) {
            return res.json({
                errorLocate: 'user',
                isLogged: false,
                message: 'No user found!'
            });
        }
        req.logIn(user, (error) => {
            if (error) {
                console.log(error);
                return res.json({
                    errorLocate: 'server',
                    isLogged: false,
                    error: error.message
                });
            }
            return res.json({
                isLogged: true,
                message: 'User has logged successfully',
                user
            });
        });
    })(req, res, next);
};
exports.localLoginHandler = localLoginHandler;
exports.passportLocal = passport_1.default;
