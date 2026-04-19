const user = require("../model/User");
const bcrypt =require('bcrypt')// safest
const jwtToken = require("jsonwebtoken");


const signup = async(req,res)=>{
    const {name,email,password,age} = req.body;
    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({name,email,password:hashedPassword,age});
    res.status(201).json({message:"User created successfully",user: newUser});
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  const existinguser = await user.findOne({ email });
  if (!existinguser) {
    return res.status(400).json({ message: "User not found" });
  }
  const Checkpassword = await bcrypt.compare(password, existinguser.password);
  if (!Checkpassword) {
    return res.status(400).json({ message: "invalid Password" });
  }
  const token = jwtToken.sign(
    { id: existinguser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.status(200).json({ message: "Login successful", token });
};

exports.signUp = signup;
exports.signIn = signin;