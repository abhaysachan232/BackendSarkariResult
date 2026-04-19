const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async(req, res)=>{
const {name, email, password,date, age} = req.body;
const existingUser = await user.findOne({email});
if(!existingUser){
    const password = await bcrypt.hash(req.body.password,10);
   const newUser = await user.create({
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
    const existingUser = await user.findOne({email});
    if(!existingUser){
        res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect){
        res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }
    const Token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        token: Token
    });
}

exports.signUp = signUp;
exports.signIn = signIn;