"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LocalLoginController_1 = require("../../../Controllers/auth/log_in/passportLogin/LocalLoginController");
const checkAuthontication_1 = require("../../../Middleware/checkAuthontication");
const router = (0, express_1.Router)();
router.post('/auth/login', LocalLoginController_1.localAuthonticateUser);
router.get('/auth/get-user', LocalLoginController_1.getUserAfterLogged);
router.get('/auth/is-logged-in', LocalLoginController_1.isUserAuthonticated);
router.get('/auth/logout', checkAuthontication_1.checkAuthontication, LocalLoginController_1.logoutProcess);
//protected route for test
router.get("/auth/protected-route", checkAuthontication_1.checkAuthontication, (req, res) => {
    return res.json({ message: "hello" });
});
//
exports.default = router;
