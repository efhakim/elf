const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const HttpError = require("../models/http.error")

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        console.log("next")
        return next()
    }
    try {
        decode = jwt.verify(token, "cdd50e63-e67e-4a6c-8b58-77de2615c052")
        console.log("now it worked")
    } catch(err) {
        const error = new HttpError(err, 500)
        console.log(error)
        return next(error)
    }
    return next()
}

module.exports = requireAuth