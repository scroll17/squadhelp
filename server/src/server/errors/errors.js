const NotFound = require("./NotFound");
const Forbidden = require("./Forbidden");
const Gone = require("./Gone");
const Unauthorized  = require("./Unauthorized");
const Conflict = require("./Conflict");
const BadRequest = require("./BadRequest");
const Locked = require("./Locked");

const AuthenticationTimeout = require("./AuthenticationTimeout");

module.exports = {
    NotFound,
    Forbidden,
    Gone,
    Unauthorized,
    AuthenticationTimeout,
    Conflict,
    BadRequest,
    Locked,
};
