import {validationResult} from 'express-validator';
import * as chatService from '../Services/chat.Service.js';
export const chat=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {message}=req.body;
        const response=await chatService.generateResponse({message});
        res.json({response});
        next();
    }
    catch(error)
    {
          res.status(500).json({error:error.message});
          next(error);
    }
}
