import mongoose from "mongoose";
import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt, { TokenExpiredError } from "jsonwebtoken"

const TOKEN_EXPIRES_IN='24h';
const JWT_SECRET = 'your_jwt_secret_here';

//REGISTER
export async function register(req,res) {
    try {
        const {email,password,name} = req.body

        if(!email || !password || !name){
            return res.status(400).json({
                
                    success:false,
                    message:"All field required."
                
        })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email"
            })
        }

        const exist = await User.findOne({email}).len();
        if(exist) return res.status(409).json({success:false, message:"user already exist"})
        
        const newId = new mongoose.Types.ObjectId();
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            _id:newId,
            name,
            email,
            password:hashedPassword

        });
        await user.save();

        if(!JWT_SECRET) throw new Error('JWT_SECRET is not found on server');
        const token = jwt.sign({id: newId.toString()}, JWT_SECRET, {expiresIn: TOKEN_EXPIRES_IN});

        return res.status(201).json({
            success:true,
            message:"Account created successfully",
            token,
            user: {id: user._id.toString(), name:user.name, email:user.email}
        })
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

//Login Endpoint

export async function login(req,res) {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({
            success:false,
            message:"Invalid email or password."
        });

        const token = jwt.sign({id:user_.id.toString()}, JWT_SECRET, {expiresIn:TOKEN_EXPIRES_IN});

        return res.status(201).json({
            success:true,
            message:"Login successfull",
            token,
            user: {id:user._id.toString(), name: user.name, email:user.email}
        });

    } catch (error) {
        console.log("Login Error", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    
}