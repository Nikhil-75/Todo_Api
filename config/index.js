require('dotenv').config();


module.exports = {
    DB: process.env.DB,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH: process.env.JWT_REFRESH
}


