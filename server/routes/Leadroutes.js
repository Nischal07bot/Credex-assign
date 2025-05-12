import {Router} from "express";
import * as LeadController from "../controllers/leadController.js";
import * as auth from "../middleware/leadauth.js";
import {body} from "express-validator";
const router=Router();
router.post("/leads",[body('name').notEmpty().withMessage('Name is required'),
body('email').isEmail().withMessage('Invalid email'),
body('licenseType').isIn(['Basic','Professional','Enterprise'])],auth.authmiddleware,LeadController.createLead);
router.post("/leads/quote",[body('email').isEmail().withMessage('Invalid Mail'),body('quote').notEmpty().withMessage('Quote is required'),body('licensetype').notEmpty().withMessage('License type is required'),body('quantity').isInt({min:1}).withMessage('Quantity must be a positive integer')],LeadController.createquote);
export default router;

