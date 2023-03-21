const { UserData } = require('../models/userdata')
const key = require("../config");
const jwtService = require('../services/jwtService')

const JWT_REFRESH = require('../config/index')
const jwt = require('jsonwebtoken');
const e = require('express');




exports.forgetPassword = async (req, res, next) => {
  try {
    const exist = await UserData.exists({ email: req.body.email });
   console.log(exist)
    const token = jwt.sign({ user_id: exist._id } , JWT_SECRET, "2h",
    );

    

    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.resetPassword = async (req, res) => {
  const Id =  req.token.user_id;
  const password = req.body.password;
  
   try {
    const user = await UserData.findByIdAndUpdate(Id, password, {new: true })
    res.status(200).json({
      message: "password update successfully",
      access_token: user,
    })
   } catch (error) {
    res.status(400).json({message:error.mesage})
   }
}



exports.userId = async (req, res) => {
  const { email, password } = req.body
  console.log(user)
  try {
    const user = await UserData.findOne({ email }).exec();
    const token = jwtService.sign({ _id: user._id, });
    user.token = token;
    return res
      .status(200)
      .json({
        message: "user login successfully",
        access_token: user.token,
        // User_id: user._id
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userData = async (req, res) => {
  let access_token;
  let refresh_token;
  
  try {
    const user = new UserData(req.body);
    const result = await user.save();
    //Token
    const token = jwtService.sign({_id: result._id,})
    const refresh_token = jwtService.sign({ _id: result._id, }, JWT_REFRESH, '1y' )
    return res
      .status(200)
      .json({
        message: "register  successfully",
        refresh_token: refresh_token,
        access_token: token

      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




