const { JWT_SECRET, JWT_REFRESH } = require("../config");
const jwt = require('jsonwebtoken')
class jwtService {
    static sign(payload, expiry = '1h' ,  secret = JWT_SECRET) {
        return jwt.sign(payload, secret);
    }


}



module.exports = jwtService;