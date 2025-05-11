import User from "../models/User.js"
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import * as UserService from "../Services/User.Service.js";
// Register new user
export const register = async (req, res) => {//register endpoint is correct
  const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user =await UserService.createUser({email,password});
    // Generate token
    const token = jwt.sign({ email:user.email}, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
}; 
export const getdashboard = async (req, res) => {
  try {
      console.log(req.user);
      const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

      if (!token) {
          return res.status(401).json({ error: "Unauthorized, token missing" });
      }

      res.status(200).json({ user: req.user, token: token });
  } catch (err) {
      console.error("Error in getdashboard:", err);
      res.status(500).json({ error: err.message });
  }
};
export const Logout=async(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message:"Logged out successfully"});
}