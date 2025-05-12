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
        next(error);
        res.status(500).json({error:error.message});
       
    }
}
export const createquote=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,quote,licensetype,quantity}=req.body;
        console.log(email,quote,licensetype,quantity);
        await LeadService.sendQuoteEmail(email,quote,licensetype,quantity);
        res.status(200).json({message:'Quote email sent successfully'});
        next();
    }
    catch(error){
        next(error);
        res.status(500).json({error:error.message});
    }
}