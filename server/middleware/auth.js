import jwt from "jsonwebtoken";

export const authmiddleware = async (req, res, next) => {
  try {
    const token=req.cookies.token || req.headers.authorization.split(" ")[1];
    if(!token)
    {
      return res.status(401).json({message:"Unauthorized user"});
    }
    const dectoken=jwt.verify(token,process.env.JWT_SECRET);
    req.user=dectoken;
    next();
  }
  catch(error)
  {
    res.status(500).alert({error:error.message});
  }
};
//