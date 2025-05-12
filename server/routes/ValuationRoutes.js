import {Router} from 'express';
import * as valuationController from '../controllers/valuationController.js';
import {body,validationResult} from 'express-validator';

const router=Router();

router.post('/compute',[body('licensetype').notEmpty(),body('quantity').isInt({min:1}),
    (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
],valuationController.computeValuation);

export default router;
