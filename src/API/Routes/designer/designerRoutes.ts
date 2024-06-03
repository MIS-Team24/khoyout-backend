import express from 'express';
import { getAllDesigners, getDesignerById } from "../../Controllers/designer/readAllDesignersController";
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
    page: z.coerce.number().int().min(0).max(Number.MAX_SAFE_INTEGER).optional(),
    limit: z.coerce.number().int().min(0).max(500).optional(),
    sortBy: z.nativeEnum(designersSortBy).optional()
});

router.get('/', BodyValidator({ schema: designersQuerySchema, validateTarget: objectToValidate.QUERY }), getAllDesigners);
router.get('/:id', getDesignerById);

export default router;