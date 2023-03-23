const { UserData } = require('../models/userdata')


const passwordVerify = (req,res,next)=>{
    if (req.body.password !== req.body.confirm_Password) 
    
    return res.status(500).json({ Error: 'password does not matched' });

        next();

    }

    
module.exports = passwordVerify;