
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


exports.verifyToken = async (req, res, next) => {
   try {
    if(!req.headers.authorization) {
        return res.send("unauthorization")
 }

 const tokens =  req.headers.authorization.split(" ")[1]

 if(tokens) {
    const accessToken = jwt.verify(tokens, JWT_SECRET);
    if(!accessToken) 
    res.status(400).json({ message: "invalid refresh token"})
            req.token = accessToken;
            next();
 }
   } catch (error) {
    res.status(400).json({message: error.message})
   }
};



