import express from 'express';
import { getAllDesigners, getDesignerById } from "../../Controllers/designer/readAllDesignersController";

const router = express.Router();

router.get('/', getAllDesigners);
router.get('/:id', getDesignerById);

export default router;