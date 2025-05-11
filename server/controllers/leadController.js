import * as LeadService from "../Services/Lead.Service.js";
import Lead from "../models/Lead.js";
import {validationResult} from "express-validator";
export const createLead=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const lead=await Lead.create(req.body);
        await LeadService.sendLeadEmail(lead);
        res.status(201).json(lead);
        next();
    }catch(error){
        res.status(500).json({error:error.message});
        next(error);
    }
}