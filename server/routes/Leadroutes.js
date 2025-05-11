import {Router} from "express";
import * as LeadController from "../controllers/leadController.js";
import * as auth from "../middleware/leadauth.js";
import {body} from "express-validator";
const router=Router();
router.post("/leads",body('name').notEmpty().withMessage('Name is required'),
body('email').isEmail().withMessage('Invalid email'),
body('licenseType').isIn(['Basic','Professional','Enterprise']),auth.authmiddleware,LeadController.createLead);
export default router;

