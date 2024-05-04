"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const logoutHandler = (req, res) => {
    res.clearCookie("khoyout-user").json({
        success: true,
        message: "user has logged out successfully!"
    });
};
exports.logoutHandler = logoutHandler;
