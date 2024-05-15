import { Router } from "express";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { UserType } from "../../types/user";

const router = Router();

router.get("", checkIfAuthenticated(UserType.User), (req, res) => {
    res.sendStatus(570);
});

router.get("", checkIfAuthenticated(UserType.User));

router.post("/appointments/:designerId/request-appointment", checkIfAuthenticated(UserType.User));


export default router;