import {Router} from "express";
import {body} from "express-validator";;
import * as auth from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";
const router=Router();
router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 character long"),
    body("username").notEmpty().withMessage("Username is required"),
    body("confirmPassword").custom((value,{req})=>{
        if(value !== req.body.password){
            console.log({value,email:req.body.email,password:req.body.password,confirmPassword:value});
            throw new Error("Password confirmation does not match");
        }
        return true;
    })
],userController.register);
router.post("/login",[body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")],userController.login);
    router.get("/profile",auth.authmiddleware,userController.getProfile);
    router.get("/logout",auth.authmiddleware,userController.Logout);
    router.get("/dashboard",auth.authmiddleware,userController.getdashboard);
    export default router;
