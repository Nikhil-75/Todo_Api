const express = require('express');
const routers = express.Router();
const userReg = require('../controllers/userController');
const userTodo = require('../controllers/todoController')
const { verifyToken } = require("../auth/verifyToken");
//const { refreshTokenVerify } = require("../auth/refreshTokenVerify");
//const passwordVerify = require("../middlewares/passwordVerification");
const userlogin = require('../middlewares/loginValidation');
const uservalidation = require('../middlewares/validationdata');
const passwordVerify = require('../middlewares/passwordVerification');


routers.post('/registers', uservalidation, userReg.userData)
routers.post('/login', userlogin, userReg.userId)
routers.post("/forgot-password", userReg.forgetPassword)
 routers.put("/code-verify", userReg.codeVerify)

//routers.put("/verify-reset-password", userReg.codeVerify)

// routers.put( "/verify-reset-password",verifyToken,passwordVerify,userReg.resetPassword);


routers.post('/addNewTodo', verifyToken, userTodo.addTodo)
routers.get('/getallTodo', verifyToken, userTodo.allTodo);
routers.post("/completeTodo", verifyToken, userTodo.completeTodo);
routers.delete("/deleteTodo", verifyToken, userTodo.deleteTodo);
module.exports = routers;