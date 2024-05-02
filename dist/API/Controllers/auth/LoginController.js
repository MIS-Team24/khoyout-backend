"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
require("dotenv/config");
function loginHandler(req, res) {
    const loginBody = req.body;
    res.status(200).send("login");
}
exports.loginHandler = loginHandler;
