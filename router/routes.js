import express from "express";
import { signUp, signIn } from "../controller/authController.js";
const router = require("express").Router();
import { findById } from "../models/UserSchema.js";
import authMiddleware from "../middleware/middleWare.js";

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", authMiddleware, async (req, res) => {
  const UserId = req.user.id;
  const user = await findById(UserId);
  res.status(200).json({
    success: true,
    user: user,
  });
});

export default router;
