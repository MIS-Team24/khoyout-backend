"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = (length) => {
    let otp = "";
    for (let index = 0; index < length; index++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};
exports.generateOTP = generateOTP;
