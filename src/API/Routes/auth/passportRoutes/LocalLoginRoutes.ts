import { Router} from 'express'
import { checkIfAuthonticated } from '../../../Middleware/checkAuthontication';
import { loginSchema } from '../../../../Services/validationSchemas/UserSchema';
import BodyValidator from '../../../Middleware/BodyValidator';
import { localLoginHandler } from '../../../Controllers/auth/log_in/passportLogin/localStrategy/LoginController';
import { getUserHandler } from '../../../Controllers/auth/log_in/passportLogin/localStrategy/GetUserController';
import { isUserAuthonticatedHandler } from '../../../Controllers/auth/log_in/passportLogin/localStrategy/IsUserAuthController';
import { logoutHandler } from '../../../Controllers/auth/log_in/passportLogin/localStrategy/LogoutController';

const router = Router()

router.post('/auth/login' , BodyValidator({schema: loginSchema})
, localLoginHandler)
router.get('/auth/get-user' , getUserHandler)
router.get('/auth/is-logged-in', isUserAuthonticatedHandler)
router.get('/auth/logout' , logoutHandler)

//protected route for test
router.get("/auth/protected-route", checkIfAuthonticated , (req , res) => {
    return res.json({message : "hello"})
})
//

export default router;
