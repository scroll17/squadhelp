const { ACCESS_SECRET, REFRESH_SECRET, EXPIRES_IN_ACCESS, EXPIRES_IN_REFRESH, TOKEN } = require("../../constants");
const checkJwtTokens = require('jsonwebtoken');
const util = require('util');


const singToken = util.promisify(checkJwtTokens.sign);
const verifyToken = util.promisify(checkJwtTokens.verify);

module.exports.jwtSignAccess = (email, name, role, id) => {
    try{
        return singToken({email: email, name: name, role: role, id: id }, ACCESS_SECRET, {expiresIn: EXPIRES_IN_ACCESS});
    }catch (err) {
        return next(err)
    }
};

module.exports.jwtSignRefresh = (userId, role) => {
    try{
        return singToken({ userId: userId, userRole: role}, REFRESH_SECRET, {expiresIn: EXPIRES_IN_REFRESH })
    }catch (err) {
        return next(err)
    }
};

module.exports.verifyToken = (token, type) => {
    const secret = type === TOKEN.REFRESH ? REFRESH_SECRET : ACCESS_SECRET;
    return verifyToken(token, secret);
};


