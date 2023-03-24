const { UserData } = require("../models/userdata");
const { PasswordReset } = require("../models/PasswordReset");
const { refreshToken } = require("../models/refreshToken");

const key = require("../config");
const jwtService = require("../services/jwtService");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
//const {PasswordReset} = require("../models/PasswordReset");
const JWT_REFRESH = require("../config/index");
const e = require("express");                                 

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exist = await UserData.exists({ email });
    if (!exist) res.status(400).json({ message: error.message });
    await PasswordReset.deleteMany({email})
    const otp = uuidv4().slice(0,4);
    const pr = new PasswordReset({ email, otp })
    await pr.save()
   console.log(pr)
    res.status(200).json({ message: "Reset code is success" });

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "email is not correct" });
  }
};


/*exports.resetPassword = async (req, res) => {
  try {
    const Id = req.token;

    console.log(Id)

    const password = req.body.password;
    console.log(password)
    const user = await UserData.findByIdAndUpdate(Id, password);
   await user.save()
    
    res.status(200).json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};*/


exports.codeVerify = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const user = await UserData.findOne({ email });
    console.log(user)
    if (!user) {
      return next({ message: "user not found" });
    }
    const userExist = await PasswordReset.findOne({ email });
     console.log(userExist)


    if (otp !== userExist.otp) {
      
      return next({ message: "invalid user" });
    }
    if(password !== confirm_Password) {
      throw new Error('password not matched')
    }

    const updatePassword = await UserData.findByIdAndUpdate(user._id, password);
    await updatePassword.save()
   res.status(200).json({ message : " password update successfully "})

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.userId = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await UserData.findOne({ email }).exec();

    const token = jwtService.sign({ _id: user._id, email });
    user.token = token;



    
     const refresh_token = jwtService.sign({ _id: user._id }, JWT_REFRESH, "1y");
    const emailFind = await refreshToken.findOne({ email });
    if(emailFind) {
      const updateToken = await refreshToken.findOneAndUpdate(
        { email: email },
        { token: refresh_token },
        { new: true }
      );
    } else{
      await refreshToken.create({ token: refresh_token, email:email });
    }


    return res.status(200).json({
      message: "user login successfully",
      access_token: user.token,
      refresh_token:refresh_token
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
    const access_token = jwtService.sign({ _id: result._id });
    const refresh_token = jwtService.sign(
      { _id: result._id },
      JWT_REFRESH,
      "1y"
    );

     await refreshToken.create({ token: refresh_token });
    return res.status(200).json({
      message: "register  successfully",
      refresh_token: refresh_token,
     // access_token: access_token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
