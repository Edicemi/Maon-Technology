//authorization middleware

const jwt = require('jsonwebtoken');
require("dotenv").config()
const CustomError = require('../lib/customError')

const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60
    });
}

const jwtVerify = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return false;
    }
}

const validateUserToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let result;
        if (authHeader) {
            const token = req.headers.authorization.split(' ')[1];
            result = jwtVerify(token);
            if (!result) {
                throw Error('Invaled bearer token', 404);
            } else {
                req.decoded = result;
                // console.log("this is from the result", result)
                next();
            }
        } else {
            throw Error('Authorization Header is required, user not recognized', 404);
        }
    } catch (error) {
        next(error);
      }
    };

module.exports = { jwtSign, jwtVerify, validateUserToken }