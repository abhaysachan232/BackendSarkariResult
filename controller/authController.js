import express from "express";
import { sign } from 'jsonwebtoken';
import { findOne, create } from '../models/UserSchema';
import { hash, compare } from 'bcrypt';

const signUp = async(req, res)=>{
const {name, email, password,date, age} = req.body;
const existingUser = await findOne({email});
if(!existingUser){
    const password = await hash(req.body.password,10);
   const newUser = await create({
    name: name,
    email: email,
    password: password,
    date: date.now(),
    age: age
   })
   res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser
   });


}
if(existingUser){
    res.status(400).json({
        success: false,
        message: "User already exists"
    });

}
}

const signIn = async(req, res)=>{
    const {email, password} = req.body;
    const existingUser = await findOne({email});
    if(!existingUser){
        res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if(!isPasswordCorrect){
        res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }
    const Token = sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        token: Token
    });
}

const _signUp = signUp;
export { _signUp as signUp };
const _signIn = signIn;
export { _signIn as signIn };