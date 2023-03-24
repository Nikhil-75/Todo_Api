const mongoose = require('mongoose')
const Schema= mongoose.Schema;

const refreshTokenSchema = new Schema({
    token:{type:String,unique:true},
   email: {type:String}
   
},{timestamps:false});

const refreshToken = mongoose.model('RefreshToken',refreshTokenSchema,'refreshToken')

module.exports = {refreshToken}