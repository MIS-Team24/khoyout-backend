"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.findUserBy = void 0;
const Database_1 = require("../../Database");
//find by unique attribute
const findUserBy = async (data) => {
    const user = await Database_1.prisma.users.findUnique({
        where: data
    });
    return user;
};
exports.findUserBy = findUserBy;
//
//create user
const addUser = async (data) => {
    const user = await Database_1.prisma.users.create({ data });
    return user;
};
exports.addUser = addUser;
//
//update user data
const updateUser = async (uniqueData, data) => {
    const user = await Database_1.prisma.users.update({
        where: uniqueData,
        data: { ...data }
    });
    return user;
};
exports.updateUser = updateUser;
//
//update user data
const deleteUser = async (data) => {
    const user = await Database_1.prisma.users.delete({
        where: data
    });
    return user;
};
exports.deleteUser = deleteUser;
//
//read all user data
const readUser = async (data) => {
    const user = await Database_1.prisma.users.findUnique({
        where: data
    });
    return user;
};
exports.readUser = readUser;
//
