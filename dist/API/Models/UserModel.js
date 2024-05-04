"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.resetPassword = exports.addUser = exports.findUserByEmail = void 0;
const Database_1 = require("../../Database");
//check if user exist and return that user (using email checking) 
const findUserByEmail = async (email) => {
    const user = await Database_1.prisma.users.findUnique({
        where: {
            email
        }
    });
    return user;
};
exports.findUserByEmail = findUserByEmail;
//
//create user
const addUser = async (data) => {
    const user = await Database_1.prisma.users.create({ data });
    return user;
};
exports.addUser = addUser;
//
//reset password
const resetPassword = async (data, email) => {
    return await Database_1.prisma.users.update({
        where: {
            email
        },
        data: {
            password: data.password
        }
    });
};
exports.resetPassword = resetPassword;
//
//verify email
const verifyEmail = async (email) => {
    const user = await Database_1.prisma.users.update({
        where: {
            email
        },
        data: {
            emailActivated: true
        }
    });
    return user;
};
exports.verifyEmail = verifyEmail;
//