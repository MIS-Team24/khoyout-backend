"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const localStrategy = require('passport-local').Strategy;
const UserModel_1 = require("../../API/Models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const main_1 = require("../../API/Exceptions/main");
const initializePassport = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const loginBody = { email, password };
        const user = await (0, UserModel_1.findUserByEmail)(loginBody.email);
        //the user form returned according to the frontent desire
        let userReturnedToFront = {
            id: user?.id,
            email: user?.id,
            emailActivated: user?.emailActivated,
            createdAt: user?.createdAt,
            fullName: user?.fullName
        };
        //   
        if (!user) {
            return done(null, false); //there is no user with this email
        }
        const isMatch = await bcrypt_1.default.compare(loginBody.password, user.password);
        if (isMatch) {
            return done(null, userReturnedToFront);
        }
        const errorRsponse = {
            message: "Incorrect pasword!",
            errorCode: main_1.ErrorCode.INCORRECT_PASSWORD,
            errorStatus: main_1.ErrorStatus.BAD_REQUEST,
            details: {
                isLoggedIn: false,
                success: false,
            }
        };
        return done(errorRsponse, null);
    }));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await (0, UserModel_1.findUserById)(id);
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
            if (!user) {
                const errorRsponse = {
                    message: "User not found",
                    errorCode: main_1.ErrorCode.USER_NOT_FOUND,
                    errorStatus: main_1.ErrorStatus.BAD_REQUEST,
                    details: {
                        isLoggedIn: false,
                        success: false,
                    }
                };
                return done(errorRsponse, false);
            }
            return done(null, userReturnedToFront);
        }
        catch (error) {
            console.log(error);
            const errorRsponse = {
                message: 'Internal server error!',
                errorCode: main_1.ErrorCode.SERVER_ERROR,
                errorStatus: main_1.ErrorStatus.SERVER_ERROR,
                details: {
                    isLoggedIn: false,
                    success: false,
                }
            };
            return done(errorRsponse, null);
        }
    });
};
exports.initializePassport = initializePassport;
