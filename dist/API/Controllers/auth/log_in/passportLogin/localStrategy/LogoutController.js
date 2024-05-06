"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const logoutHandler = async (req, res, next) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                message: "user loged out successfully"
            });
        });
    }
    else {
        return res.json({
            success: false,
            message: "User is already logged out!"
        });
    }
};
exports.logoutHandler = logoutHandler;
