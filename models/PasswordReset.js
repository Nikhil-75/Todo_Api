const mongoose = require("mongoose");
const {Schema}  = mongoose;
const PasswordResetSchema = new mongoose.Schema({
  otp: { type: String, unique: true },

  email: { type: String, unique: true, required: true },
 isUsed: { type: Boolean,default:false},

},
{timestamp : true},
);


const PasswordReset =  mongoose.model('forgetPassword',PasswordResetSchema);

module.exports  = {PasswordReset }

