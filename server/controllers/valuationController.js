import {validationResult} from 'express-validator';
import * as ValuationService from '../Services/Valuation.Service.js';
import Valuation from '../models/Valuation.js';

export const computeValuation=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array()});
    }
    try{
    const {LicenseType,quantity}=req.body;
    const valuation=ValuationService.computeValuation(LicenseType,quantity);
    await Valuation.create({licenseType:LicenseType,quantity:quantity,valuation:valuation});
    res.json({ valuation });
}
catch(error)
{
    res.status(500).json({error:error.message});
}
}
