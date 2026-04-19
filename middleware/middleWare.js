import express from "express";
import { verify } from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const Token = req.header("Authorization");
  try {
    const decode = verify(Token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: `${err.message}` });
  }
};

export default authMiddleware;
