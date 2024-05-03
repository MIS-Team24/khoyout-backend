"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.findUserByEmail = void 0;
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
