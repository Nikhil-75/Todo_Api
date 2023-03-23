const { UserData } = require("../models/userdata");
const { code } = require("../models/PasswordReset");
const { refreshToken } = require("../models/refreshToken");
const key = require("../config");
const jwtService = require("../services/jwtService");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const {PasswordReset} = require("../models/PasswordReset");
const JWT_REFRESH = require("../config/index");
const e = require("express");

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exist = await UserData.exists({ email });
    if (!exist) res.status(400).json({ messase: error.message });

    const code = uuidv4().slice(0,4);

    

    await PasswordReset.deleteMany({ email });

    var results = { email, code };
    PasswordReset.create(results);

    res.status(200).json({ message: "Reset code is success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.codeVerify = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const user = await UserData.findOne({ email });
    if (!user) {
      return next({ message: "user not found" });
    }
    const userExist = await PasswordReset.findOne({ email });

    if (code == userExist) {
      return next({ message: "invalid user" });
    }
    const token = jwtService.sign({ user_id: user._id });

    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const Id = req.token3;
    const password = req.body.password;

    const user = await UserData.findByIdAndUpdate(Id, password);
    res.status(200).json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userId = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserData.findOne({ email }).exec();

    const token = jwtService.sign({ _id: user._id });
    user.token = token;
    return res.status(200).json({
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
    const token = jwtService.sign({ _id: result._id });
    const refresh_token = jwtService.sign(
      { _id: result._id },
      JWT_REFRESH,
      "1y"
    );
    return res.status(200).json({
      message: "register  successfully",
      refresh_token: refresh_token,
      access_token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
