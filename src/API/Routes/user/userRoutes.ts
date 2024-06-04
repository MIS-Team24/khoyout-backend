import express from "express";
import { uploadUpdateAvatarController } from "../../Controllers/user/profileAvatar/uploadUpdateAvatarController";
import { upload } from "../../../Services/multer";
import { deleteAvatarController } from "../../Controllers/user/profileAvatar/deleteAvatarController";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { deleteUserAccount } from "../../Controllers/user/deleteAccountController";
import { updateUserData } from "../../Controllers/user/updateDataController";
import { updateBodyMeasurementData } from "../../Controllers/user/updateBodyMeasurementController";
import { updateStylePreferenceData } from "../../Controllers/user/updateStylePreference";
import { readUserData } from "../../Controllers/user/readDataController";
import { changeUserPassword } from "../../Controllers/user/changePassword";
import { cahngePasswordSchema } from "../../../Services/validationSchemas/UserSchema";
import BodyValidator from "../../Middleware/BodyValidator";

const router = express.Router();

//user avatar
router.post("/upload-update-avatar", checkIfAuthenticated(), upload.single("file") , uploadUpdateAvatarController)
router.delete("/delete-avatar",checkIfAuthenticated() , deleteAvatarController)
//

router.get("/read-user" , checkIfAuthenticated() , readUserData)
router.patch("/change-password" ,checkIfAuthenticated(), BodyValidator({schema: cahngePasswordSchema}) , changeUserPassword)
router.patch("/update-data" , checkIfAuthenticated() , updateUserData)
router.patch("/body-measurement-update-data" , checkIfAuthenticated() , updateBodyMeasurementData)
router.patch("/style-preference-update-data" , checkIfAuthenticated() , updateStylePreferenceData)
router.delete("/delete-account" , checkIfAuthenticated() ,  deleteUserAccount)

export default router;