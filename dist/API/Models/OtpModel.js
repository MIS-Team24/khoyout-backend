"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOtpById = exports.addNewOtp = void 0;
const Database_1 = require("../../Database");
//add new otp code record in the database
const addNewOtp = async (data) => {
    const OtpRecord = await Database_1.prisma.otps.create({ data });
    return OtpRecord;
};
exports.addNewOtp = addNewOtp;
//
//find otp by id
const findOtpById = async (id) => {
    const OtpRecord = await Database_1.prisma.otps.findUnique({
        where: {
            id
        }
    });
    return OtpRecord;
};
exports.findOtpById = findOtpById;
//
