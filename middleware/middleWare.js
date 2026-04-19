const express = require("express");
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const Token = req.header('Authorization');
    try{
        const decode = jwt.verify(Token, process.env.JWT_SECRET);
        req.user = decode;        
        next();
    }
   catch(err){
res.status(401).json({ message: `${err.message}` });
   }
}

module.exports = authMiddleware;