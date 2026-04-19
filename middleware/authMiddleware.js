const jwt = require("jsonwebtoken");
const User = require("../model/User")

const authMiddleware = (req, res, next) => {
    const Token  = req.headers.authorization;
try{
const decode = jwt.verify(Token, process.env.JWT_SECRET);
const userId = decode.id;
req.user = decode;
console.log(User.findById(userId),'data');
next();
}
catch(err){
    res.status(401).json({message:`${err.message}`});
}
}
 module.exports = authMiddleware;