import { Router , Request , Response , NextFunction} from 'express'
import { getUserAfterLogged , logoutProcess, localAuthonticateUser, isUserAuthonticated } from '../../../Controllers/auth/log_in/passportLogin/LocalLoginController';
import { checkAuthontication } from '../../../Middleware/checkAuthontication';

const router = Router()

router.post('/auth/login' , localAuthonticateUser)
router.get('/auth/get-user' , getUserAfterLogged)
router.get('/auth/is-logged-in', isUserAuthonticated)
router.get('/auth/logout' , logoutProcess)

//protected route for test
router.get("/auth/protected-route", checkAuthontication , (req , res) => {
    return res.json({message : "hello"})
})
//

export default router;
