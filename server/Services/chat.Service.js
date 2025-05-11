import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResponse = async (message) => {
    const error = validationResult(message);
    if (!error.isEmpty()) {
        throw new Error({ errors: error.array() });
    }
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent([
            "You are a SoftSell company selling support assistant",
            message
        ]);
        
        const response = await result.response;
        return response.text();
    } catch (error) {
        throw new Error(error.message);
    }
}