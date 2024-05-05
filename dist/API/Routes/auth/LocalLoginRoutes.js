"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LocalLoginController_1 = require("../../Controllers/auth/log_in/passportLogin/LocalLoginController");
const router = (0, express_1.Router)();
router.get('/auth/logout', LocalLoginController_1.logoutProcess);
router.get('/auth/get_user', LocalLoginController_1.getUserAfterLogged);
//router.get('/is_logged_in', UserLoginLocalControlller.getAnyPage)
router.post('/auth/login', (req, res, next) => {
    LocalLoginController_1.passportLocal.authenticate('local', (error, user, info) => {
        if (error) {
            console.log(error);
            return res.json({
                success: false,
                errorType: 'user',
                isLogged: false,
                error: error.message
            });
        }
        if (!user) {
            return res.json({
                success: true,
                errorType: 'user',
                isLogged: false,
                message: 'The password in not correct!, No user found!'
            });
        }
        req.logIn(user, (error) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    errorType: 'server',
                    isLogged: false,
                    error: error.message
                });
            }
            return res.json({
                success: true,
                isLogged: true,
                message: 'User has logged successfully',
                user
            });
        });
    })(req, res, next);
});
exports.default = router;
