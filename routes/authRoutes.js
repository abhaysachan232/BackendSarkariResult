const express = require("express");
const routes = express.Router();
const {signup,login} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/User");

routes.post("/signup",signup);
routes.post("/login",login);
routes.get("/profile",authMiddleware,(req,res)=>{
    const userId = req.user.id;
    const userData = User.findById(userId);
    res.status(200).json({message:`${userData}`, user: req.user });
});

module.exports = routes;