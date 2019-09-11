const ACCESS_SECRET = "Keep it simple, stupid";
const REFRESH_SECRET = "xzzzzzzzzz";

const EXPIRES_IN_ACCESS = '30min';
const EXPIRES_IN_REFRESH = '15d';

const TOKEN = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
    MAX_NUMBER_OF_REFRESH_TOKEN: 3
};
module.exports = {
    ACCESS_SECRET,
    REFRESH_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    TOKEN
};