const signIn = require("../Controllers/signIn");
const signUp = require("../Controllers/signUp");
const router = require("express").Router();
const User = require("../models/UserSchema");
const express = require("express");
const authMiddleware = require("../middleware/middleWare");

router.post("/signup", signUp.signUp);
router.post("/signin", signIn.signIn);
router.get("/profile", authMiddleware, async (req, res) => {
  const UserId = req.user.id;
  const user = await User.findById(UserId);
  res.status(200).json({
    success: true,
    user: user,
  });
});
