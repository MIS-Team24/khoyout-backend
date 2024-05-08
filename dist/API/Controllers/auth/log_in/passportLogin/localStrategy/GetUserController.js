"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = void 0;
const main_1 = require("../../../../../Exceptions/main");
//get user after logging if frontend want at any time
//get authonticated user
const getUserHandler = async (req, res) => {
    if (req?.user) {
        return res.json({ authonticated: true, user: req?.user,
            sessionId: req.sessionID }); //200 default status
    }
    else {
        return res.status(main_1.ResStatus.UNAUTHORIZED)
            .json({ authonticated: false, user: null });
    }
};
exports.getUserHandler = getUserHandler;
