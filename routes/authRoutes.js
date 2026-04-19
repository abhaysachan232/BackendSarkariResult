const express = require("express");
const routes = express.Router();
// routes file
const { signIn,signUp} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/User");

routes.post("/signup", signUp);
routes.post("/login", signIn);
routes.get("/profile",authMiddleware,async (req,res)=>{
    const userId = req.user.id;
    const userData = await User.findById(userId);
    res.status(200).json({message:`${userData}`, user: req.user });
});

module.exports = routes;