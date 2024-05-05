"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthontication = void 0;
const checkAuthontication = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json({ authonticated: false });
    }
    next();
};
exports.checkAuthontication = checkAuthontication;
