"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthonticatedHandler = void 0;
//controller for handling protected routes 
//also there is a middleware controller in the midlleware folder
const isUserAuthonticatedHandler = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ authonticated: true });
    }
    return res.json({ authonticated: false });
};
exports.isUserAuthonticatedHandler = isUserAuthonticatedHandler;
