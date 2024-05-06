"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuthontication_1 = require("../../../Middleware/checkAuthontication");
const UserSchema_1 = require("../../../../Services/validationSchemas/UserSchema");
const BodyValidator_1 = __importDefault(require("../../../Middleware/BodyValidator"));
const LoginController_1 = require("../../../Controllers/auth/log_in/passportLogin/localStrategy/LoginController");
const GetUserController_1 = require("../../../Controllers/auth/log_in/passportLogin/localStrategy/GetUserController");
const IsUserAuthController_1 = require("../../../Controllers/auth/log_in/passportLogin/localStrategy/IsUserAuthController");
const LogoutController_1 = require("../../../Controllers/auth/log_in/passportLogin/localStrategy/LogoutController");
const router = (0, express_1.Router)();
router.post('/auth/login', (0, BodyValidator_1.default)({ schema: UserSchema_1.loginSchema }), LoginController_1.localLoginHandler);
router.get('/auth/get-user', GetUserController_1.getUserHandler);
router.get('/auth/is-logged-in', IsUserAuthController_1.isUserAuthonticatedHandler);
router.get('/auth/logout', LogoutController_1.logoutHandler);
//protected route for test
router.get("/auth/protected-route", checkAuthontication_1.checkIfAuthonticated, (req, res) => {
    return res.json({ message: "hello" });
});
//
exports.default = router;
