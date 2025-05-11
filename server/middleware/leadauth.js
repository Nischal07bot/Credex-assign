import { body,validationResult } from "express-validator";
import Lead from "../models/Lead.js";

export const authmiddleware=(req,res,next)=>{
    body('name').notEmpty().withMessage('Name is required');
    body('email').isEmail().withMessage('Invalid email');
    body('licenseType').isIn(['Basic','Professional','Enterprise']);
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    next();
    
    
}
