const express = require('express');
const routers = express.Router();
const userReg = require('../controllers/userController');


const userlogin = require('../middlewares/loginValidation');
const uservalidation = require('../middlewares/validationdata')



routers.post('/registers', uservalidation, userReg.userData)
routers.post('/login', userlogin, userReg.userId)
routers.post("/forgot-password", userReg.forgetPassword)
module.exports = routers;