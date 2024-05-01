"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.isUserExist = void 0;
const Database_1 = require("../../Database");
//check if user exist (using email checking)
const isUserExist = async (email) => {
    const user = await Database_1.prisma.users.findUnique({
        where: {
            email
        }
    });
    if (user)
        return true;
    return false;
};
exports.isUserExist = isUserExist;
//create user
const addUser = async (data) => {
    const user = await Database_1.prisma.users.create({ data });
    return user;
};
exports.addUser = addUser;
