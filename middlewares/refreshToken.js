const { UserData } = require('../models/userdata')
const jwtService = require('../services/jwtService')
const { JWT_REFRESH } = require("../config");
const jwt = require("jsonwebtoken");


const refreshToken = async (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.send("unauthorization user")
        }

        const tokens = req.headers.authorization.split(" ")[1]


        if (tokens) {
            const verified = jwt.verify(tokens, JWT_SECRET);


            res.token = verified;

            next()
        }
    } catch (error) {
        res.status(400).json({
            message: "Unauthrized access"
        });
    }

}

module.exports = tokenVerify;