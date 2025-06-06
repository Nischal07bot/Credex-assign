import User from "../models/User.js";

export const createUser = async ({email,password}) => {
    if(!email || !password){
    throw new Error("Email and password are required");
    }
    const user= await User.create({email,password});
    return user;
}
