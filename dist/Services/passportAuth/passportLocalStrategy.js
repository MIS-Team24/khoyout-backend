"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const localStrategy = require('passport-local').Strategy;
const UserModel_1 = require("../../API/Models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const initializePassport = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const loginBody = { email, password };
        const user = await (0, UserModel_1.findUserByEmail)(loginBody.email);
        if (!user) {
            return done(null, false); //there is no user with this email
        }
        const isMatch = await bcrypt_1.default.compare(loginBody.password, user.password);
        if (isMatch) {
            return done(null, user);
        }
        return done(new Error("Incorrect password!"), null);
    }));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await (0, UserModel_1.findUserById)(id);
            if (!user)
                return done(new Error("User not found"), false);
            return done(null, user);
        }
        catch (error) {
            console.log(error);
            return done(new Error('Error on the sever please try again!'), null);
        }
    });
};
exports.initializePassport = initializePassport;
