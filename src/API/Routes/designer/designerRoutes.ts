import express from 'express';
import { getAllDesigners, getDesignerById } from "../../Controllers/designer/readAllDesignersController";
import { uploadUpdateDesignerAvatar } from '../../Controllers/designer/profileAvatar/uploadUpdateAvatar';
import { upload } from '../../../Services/multer';
import { deleteDesignerAvatar } from '../../Controllers/designer/profileAvatar/deleteAvatar';

const router = express.Router();

router.get('/', getAllDesigners);
router.get('/:id', getDesignerById);

//profile management
router.patch("/upload-update-avatar/:id", upload.single("file") , uploadUpdateDesignerAvatar)
router.delete("/delete-avatar/:id", deleteDesignerAvatar)
//

export default router;