const express = require('express');
const routers = express.Router();
const userReg = require('../controllers/userController');


const userlogin = require('../middlewares/loginValidation');
const uservalidation = require('../middlewares/validationdata')



routers.post('/registers', uservalidation, userReg.userData)
routers.post('/login', userlogin, userReg.userId)
routers.post("/forgot-password", userReg.forgetPassword)
routers.post("/code-verify", userReg.codeVerify)
routers.put("/verify-reset-password", userReg.resetPassword)
module.exports = routers;