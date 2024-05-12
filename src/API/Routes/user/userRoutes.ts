import express from "express";
import { uploadUpdateAvatarController } from "../../Controllers/user/profileAvatar/uploadUpdateAvatarController";
import { upload } from "../../../Services/multer";
import { deleteAvatarController } from "../../Controllers/user/profileAvatar/deleteAvatarController";
import { checkIfAuthonticated } from "../../Middleware/CheckAuth";
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
router.post("/upload-update-avatar" , checkIfAuthonticated 
    , upload.single("file") , uploadUpdateAvatarController)
router.delete("/delete-avatar",checkIfAuthonticated , deleteAvatarController)
//

router.get("/read-user" , checkIfAuthonticated , readUserData)
router.put("/change-password" ,checkIfAuthonticated 
    , BodyValidator({schema: cahngePasswordSchema}) , changeUserPassword)
router.put("/update-data" , checkIfAuthonticated , updateUserData)
router.put("/body-measurement-update-data" , checkIfAuthonticated , updateBodyMeasurementData)
router.put("/style-preference-update-data" , checkIfAuthonticated , updateStylePreferenceData)
router.delete("/delete-account" , checkIfAuthonticated ,  deleteUserAccount)

export default router;