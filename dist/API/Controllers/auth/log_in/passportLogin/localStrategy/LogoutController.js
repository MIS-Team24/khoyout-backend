"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = void 0;
const logoutHandler = async (req, res, next) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                // next(new BadServerException("Internal server error!" 
                //     , ErrorCode.SERVER_ERROR , err)); 
                res.json({
                    success: false,
                });
            }
            res.json({
                success: true,
                message: "user logged out successfully"
            });
        });
    }
    else {
        res.json({
            success: false,
        });
        // next(new BadAuthonticationException("User not authonticated!" 
        //     , ErrorCode.USER_NOT_AUTHONTICATED , {isAuth : false})); 
    }
};
exports.logoutHandler = logoutHandler;
