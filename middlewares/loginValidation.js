const { UserData } = require('../models/userdata')
const bcrypt = require("bcryptjs");
const { userId } = require('../controllers/userController');


const userlogin = async (req, res, next) => {

    try {
        const { email, password } = req.body

        if (!email && !password) {
            return res.status(400).json({ message: "please inter email and password", statuss: 400 })
        }

        const user = await UserData.findOne({ email})
        if (!user) {
            return res.status(400).json({
                message: "email is not found", status: 400
            })
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        if (!passwordIsCorrect) {
            return res.status(400).json({
                message: "password is not found ", status: 400
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = userlogin