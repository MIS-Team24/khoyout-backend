"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpEmailStructure = void 0;
const OtpEmailStructure = (otpServer, expiredAt) => {
    return `<h2>Welcome to our khoyout service</h2>
    <p>Please, inter this otp to complete the process.</p>
    <p>This code will expire in ${expiredAt} minutes.</p>
    <h1>${otpServer}</h1>`;
};
exports.OtpEmailStructure = OtpEmailStructure;
