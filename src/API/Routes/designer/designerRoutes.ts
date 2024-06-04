import express from 'express';
import { getAllDesigners, getDesignerById } from "../../Controllers/designer/readAllDesignersController";
import { uploadUpdateDesignerAvatar } from '../../Controllers/designer/profileAvatar/uploadUpdateDesignerAvatar';
import { upload } from '../../../Services/multer';
import { deleteDesignerAvatar } from '../../Controllers/designer/profileAvatar/deleteDesignerAvatar';
import { readDesignerProfileData } from '../../Controllers/designer/readDesignerProfileData';
import { updateDesignerData } from '../../Controllers/designer/updateDesignerData';
import { uploadUpdateDesignerProtofolioFile } from '../../Controllers/designer/uploadUpdateDesignerProtofolioFile';
import { deleteDesignerPortofolioFile } from '../../Controllers/designer/deleteDesignerPortofolioFile';
import { updateDesignerService } from '../../Controllers/designer/updateDesignerService';

const router = express.Router();

router.get('/', getAllDesigners);
router.get('/:id', getDesignerById);

//profile management
router.patch("/upload-update-avatar/:id", upload.single("file") , uploadUpdateDesignerAvatar)
router.delete("/delete-avatar/:id", deleteDesignerAvatar)

router.get('/read-profile-data/:id', readDesignerProfileData);
router.patch('/update-profile-data/:id', updateDesignerData);
router.patch('/upload-update-portofolio-file/:id', upload.single("file"), uploadUpdateDesignerProtofolioFile);
router.delete("/delete-portofolio-file/:id/:fileId", deleteDesignerPortofolioFile)
router.patch('/update-service-data/:id/:serviceId', updateDesignerService);
//

export default router;