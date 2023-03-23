const express = require('express');
const routers = express.Router();
const userReg = require('../controllers/userController');
const { verifyToken } = require("../auth/verifyToken");
//const { refreshTokenVerify } = require("../auth/refreshTokenVerify");
//const passwordVerify = require("../middlewares/passwordVerification");

const userlogin = require('../middlewares/loginValidation');
const uservalidation = require('../middlewares/validationdata');
const passwordVerify = require('../middlewares/passwordVerification');



routers.post('/registers', uservalidation, userReg.userData)
routers.post('/login', userlogin, userReg.userId)
routers.post("/forgot-password", userReg.forgetPassword)
routers.post("/code-verify", userReg.codeVerify)
//routers.put("/verify-reset-password", userReg.resetPassword)

routers.put( "/verify-reset-password",verifyToken,passwordVerify,userReg.resetPassword);

//routers.post("/access-token-generate",refreshTokenVerify,userReg.genAccessToken);






module.exports = routers;