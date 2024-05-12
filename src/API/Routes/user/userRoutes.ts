import express from "express";
import { uploadUpdateAvatarController } from "../../Controllers/user/profileAvatar/uploadUpdateAvatarController";
import { upload } from "../../../Services/multer";
import { deleteAvatarController } from "../../Controllers/user/profileAvatar/deleteAvatarController";
import { checkIfAuthonticated } from "../../Middleware/CheckAuth";
import { deleteUserAccount } from "../../Controllers/user/deleteAccountController";

const router = express.Router();

//user avatar
router.post("/upload-update-avatar" , checkIfAuthonticated 
    , upload.single("file") , uploadUpdateAvatarController)
router.delete("/delete-avatar",checkIfAuthonticated , deleteAvatarController)
//

// router.put("/update-data" , )
router.delete("/delete-account" , checkIfAuthonticated ,  deleteUserAccount)

export default router;