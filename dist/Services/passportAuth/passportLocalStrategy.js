"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const localStrategy = require('passport-local').Strategy;
const UserModel_1 = require("../../API/Models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const badRequest_1 = require("../../API/Exceptions/badRequest");
const main_1 = require("../../API/Exceptions/main");
const badServer_1 = require("../../API/Exceptions/badServer");
const Messages_1 = require("../responses/Messages");
const ErrorTemplate_1 = require("../responses/ErrorTemplate");
const initializePassport = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const loginBody = { email, password };
        const user = await (0, UserModel_1.findUserBy)({ email: loginBody.email });
        //the user form returned according to the frontent desire
        let userReturnedToFront = {
            id: user?.id,
            email: user?.email,
            emailActivated: user?.emailActivated,
            createdAt: user?.createdAt,
            fullName: user?.fullName,
            phone: user?.phone
        };
        //   
        if (!user) {
            return done(null, false); //there is no user with this email
        }
        const isMatch = await bcrypt_1.default.compare(loginBody.password, user.password);
        if (isMatch) {
            return done(null, userReturnedToFront);
        }
        let errorRsponse;
        errorRsponse = (0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.INCORRECT_PASSWORD, main_1.ErrorCode.INCORRECT_PASSWORD, { isLoggedIn: false }));
        return done(errorRsponse, null);
    }));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await (0, UserModel_1.findUserBy)({ id: id });
            //the user form returned according to the frontent desire
            let userReturnedToFront = {
                id: user?.id,
                email: user?.email,
                emailActivated: user?.emailActivated,
                createdAt: user?.createdAt,
                fullName: user?.fullName,
                phone: user?.phone
            };
            //   
            if (!user) {
                let errorRsponse;
                errorRsponse = (0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_NOT_FOUND, main_1.ErrorCode.USER_NOT_FOUND));
                return done(errorRsponse, false);
            }
            return done(null, userReturnedToFront);
        }
        catch (error) {
            console.log(error);
            let errorRsponse;
            errorRsponse = (0, ErrorTemplate_1.errorResponseTemplate)(new badServer_1.BadServerException(Messages_1.Messages.SERVER_ERROR, main_1.ErrorCode.SERVER_ERROR));
            return done(errorRsponse, null);
        }
    });
};
exports.initializePassport = initializePassport;
