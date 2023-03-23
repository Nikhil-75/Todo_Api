const jwt  =  require('jsonwebtoken');
const { JWT_REFRESH } = require("../config");


exports.refreshTokenVerify = async (req, res, next) => {
 
  //const auth =  req.heaaders

    try {

        if(!req.headers.authorization) {
            return res.send("unauthorization")
        }
        const tokens = req.headers.authorization.split(" ")[1]
      
        if(tokens) {
            const refreshToken = jwt.verify(tokens,JWT_REFRESH);
            if(!refreshToken)
           
            res.status(400).json({ message: "invalid refresh token"})
            req.token = refreshToken;
            next();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};