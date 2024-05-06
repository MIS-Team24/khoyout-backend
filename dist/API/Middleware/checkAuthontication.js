"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNotAuthonticated = exports.checkIfAuthonticated = void 0;
const checkIfAuthonticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json({ authonticated: false });
    }
    next();
};
exports.checkIfAuthonticated = checkIfAuthonticated;
const checkIfNotAuthonticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({ authonticated: true });
    }
    next();
};
exports.checkIfNotAuthonticated = checkIfNotAuthonticated;
