const user = require("../model/User");
const bccrpt = require("bcrypt");
const jwtToken = require("jsonwebtoken");


exports.signup = async(req,res)=>{
    const {name,email,password,age} = req.body;
    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bccrpt.hash(password,10);
    const user = await user.create({name,email,password:hashedPassword,age});
    res.status(201).json({message:"User created successfully",user});
}

exports.login = async(req,res)=>{
const {email,password}=req.body;
const existinguser = await user.findOne({email});
if(!existinguser){
    return res.status(400).json({message:"User not found"});
}
const Checkpassword = await bccrpt.compare(password,existinguser.password);
if(!Checkpassword){
    return res.status(400).json({message:"invalid Password"});

}
const token = jwtToken.sign({id:existinguser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
res.status(200).json({message:"Login successful",token});
}