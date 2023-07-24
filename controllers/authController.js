
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async(req,res)=>{

    console.log("register");

    console.log(req.body.role);
   
    try {
        // hasing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const user = new User({
            username:req.body.username,
            password:hash,
            email:req.body.email,
            photo:req.body.photo,
            role:req.body.role
        })
        const newUser = await user.save()
        res.status(201).json({success:true,message:"Register Succes",data:newUser})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Register failed2"})
    }
}

export const login = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({success:false,message:"user is not found"})
        }

        const comparedPassword = await bcrypt.compare(req.body.password,user.password)
        console.log(comparedPassword);
        if(!comparedPassword){
            return res.status(401).json({success:false,message:"wrong email or password:("})
        }

        const {password,role,...rest} = user._doc        
        const token = jwt.sign({id:user._id,role},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})
        res.cookie("accessToken",token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,token,role,message:"Login Success",data:rest})
    } catch (error) {
        res.status(500).json({success:false,message:"login failed"})
    }
}




