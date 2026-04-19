const express = require("express");
const auth = require("../controller/authController");
const router = require("express").Router();
const User = require("../models/UserSchema");
const authMiddleware = require("../middleware/middleWare");

router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);
router.get("/profile", authMiddleware, async (req, res) => {
  const UserId = req.user.id;
  const user = await User.findById(UserId);
  res.status(200).json({
    success: true,
    user: user,
  });
});

module.exports = router;
