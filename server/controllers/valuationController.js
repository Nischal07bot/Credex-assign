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
        console.log(req.body);
    const {licensetype,quantity}=req.body;
    const valuation=ValuationService.computeValuation(licensetype,quantity);
    await Valuation.create({licensetype:licensetype,quantity:quantity,valuation:valuation});
    res.json({ value:valuation,validityPeriod:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()});
}
catch(error)
{
    res.status(500).json({error:error.message});
}
}
