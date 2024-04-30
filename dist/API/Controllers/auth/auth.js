"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHandler = exports.loginHandler = void 0;
function loginHandler(req, res) {
    const loginBody = req.body;
    res.status(200).send("login");
}
exports.loginHandler = loginHandler;
function RegisterHandler(req, res) {
    const registerBody = req.body;
    res.status(200).send("register");
}
exports.RegisterHandler = RegisterHandler;
