import express from 'express';
import { uploadUpdateDesignerAvatar } from '../../Controllers/designer/profileAvatar/uploadUpdateDesignerAvatar';
import { upload } from '../../../Services/multer';
import { deleteDesignerAvatar } from '../../Controllers/designer/profileAvatar/deleteDesignerAvatar';
import { readDesignerProfileData } from '../../Controllers/designer/readDesignerProfileData';
import { updateDesignerData } from '../../Controllers/designer/updateDesignerInfoOrMapData';
import { uploadUpdateDesignerProtofolioFile } from '../../Controllers/designer/portofolio/uploadUpdateDesignerPortofolioFile';
import { deleteDesignerPortofolioFile } from '../../Controllers/designer/portofolio/deleteDesignerPortofolioFile';
import { updateDesignerService } from '../../Controllers/designer/service/updateDesignerService';
import { createDesignerService } from '../../Controllers/designer/service/createDesignerService';

import { getAllDesigners, getDesignerById, getDesignerPortfolioById } from "../../Controllers/designer/readAllDesignersController";
import { z } from 'zod';
import BodyValidator, { objectToValidate } from '../../Middleware/BodyValidator';

const router = express.Router();

export enum designersSortBy {
  yearsExperience = "yearsExperience",
  mostBooked = "mostBooked",
  highestReviews = "highestReviews",
  highestRated = "highestRated"
}

export enum designerGender {
  FEMALE = "Female",
  MALE = "Male"
}

export const designersQuerySchema = z.object({
  name: z.string().optional(),
  openNow: z.boolean().optional(),
  location: z.string().optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  gender: z.nativeEnum(designerGender).optional(),
  yearsOfExperience: z.coerce.number().min(0).max(100).optional(),
  category: z.enum(['Casual', 'Formal', 'Classic', 'Soiree']).optional(),
  page: z.coerce.number().int().min(0).max(Number.MAX_SAFE_INTEGER).optional(),
  limit: z.coerce.number().int().min(0).max(500).optional(),
  sortBy: z.nativeEnum(designersSortBy).optional()
});

router.get('/', BodyValidator({ schema: designersQuerySchema, validateTarget: objectToValidate.QUERY }), getAllDesigners);
router.get('/:id', getDesignerById);
router.get('/:id/portfolio', getDesignerPortfolioById);

//profile management
router.post("/upload-update-avatar/:id", upload.single("file") , uploadUpdateDesignerAvatar)
router.delete("/delete-avatar/:id", deleteDesignerAvatar)

router.get('/read-profile-data/:id', readDesignerProfileData);
router.patch('/update-personal-info-or-map/:id', updateDesignerData);
router.post('/upload-update-portofolio-file/:id', upload.single("file"), uploadUpdateDesignerProtofolioFile);
router.delete("/delete-portofolio-file/:id/:fileId", deleteDesignerPortofolioFile)
router.patch('/update-service-data/:id/:serviceId', updateDesignerService);
router.post('/add-service/:id', createDesignerService);
//

export default router;