import {Router} from 'express';
import * as valuationController from '../controllers/valuationController.js';
import {body} from 'express-validator';

const router=Router();

router.post('/compute',[body('licensetype').notEmpty(),body('quantity').isInt({min:1})],valuationController.computeValuation);

export default router;
