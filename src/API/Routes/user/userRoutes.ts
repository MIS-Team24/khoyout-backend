import express from "express";
import { uploadUpdateAvatarController } from "../../Controllers/user/profileAvatar/uploadUpdateAvatarController";
import { upload } from "../../../Services/multer";
import { deleteAvatarController } from "../../Controllers/user/profileAvatar/deleteAvatarController";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { deleteUserAccount } from "../../Controllers/user/deleteAccountController";
import { basicDesignerDataUpdateSchema, designerUpdateBasicInfo, updateUserData } from "../../Controllers/user/updateDataController";
import { bodyMeasurementsSchema, updateBodyMeasurementData } from "../../Controllers/user/updateBodyMeasurementController";
import { updateStylePreferenceData } from "../../Controllers/user/updateStylePreference";
import { readUserData } from "../../Controllers/user/readDataController";
import { changeUserPassword } from "../../Controllers/user/changePassword";
import { DeleteAccountBodySchema, cahngePasswordSchema } from "../../../Services/validationSchemas/UserSchema";
import BodyValidator from "../../Middleware/BodyValidator";
import { UserType } from "../../types/user";
import { UserUpdateBasicInfo, basicUserUpdateSchema } from "../../Controllers/user/updateDataUserController";

const router = express.Router();

//user avatar
router.post("/upload-update-avatar", checkIfAuthenticated(), upload.single("file") , uploadUpdateAvatarController)
router.delete("/delete-avatar",checkIfAuthenticated() , deleteAvatarController)
//

router.get("/read-user-profile-data" , checkIfAuthenticated() , readUserData)
router.patch("/change-password" ,checkIfAuthenticated(), BodyValidator({schema: cahngePasswordSchema}) , changeUserPassword)
router.patch("/update-personal-info-data" , checkIfAuthenticated() , updateUserData)
router.patch("/body-measurement-update-data" , checkIfAuthenticated(UserType.User), BodyValidator({schema: bodyMeasurementsSchema}), updateBodyMeasurementData)
router.patch("/style-preference-update-data" , checkIfAuthenticated() , updateStylePreferenceData)
router.post("/delete-account" , checkIfAuthenticated(), BodyValidator({schema: DeleteAccountBodySchema}) ,deleteUserAccount)

router.patch("/update-designer-basic", checkIfAuthenticated(UserType.Designer), BodyValidator({schema: basicDesignerDataUpdateSchema}), designerUpdateBasicInfo);
router.patch("/update-user-basic", checkIfAuthenticated(UserType.User), BodyValidator({schema: basicUserUpdateSchema}), UserUpdateBasicInfo);

export default router;