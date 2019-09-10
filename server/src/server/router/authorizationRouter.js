const express = require('express');

const createTokens = require('../middlewares/token/createTokens');

const findUserByEmail  = require('../middlewares/user/findUserByEmail');
const findUserById  = require('../middlewares/user/findUserById');

const comparePassword = require('../middlewares/password/comparePassword');
const toHashPassword = require('../middlewares/password/toHashPassword');

const checkUserForBan  = require('../middlewares/verification/checkUserForBan');
const checkCountOfTokens = require("../middlewares/token/checkCountOfTokens");
const checkRefreshToken = require('../middlewares/token/checkRefreshToken');

const {
    giveAccessUser,
    createUser,
    loginUser,
    logoutUser
} = require('../controllers/authorizationController');

const { URL: { API } } = require('../constants');


const router = express.Router();

router.post(API.LOGIN,
    findUserByEmail,
    checkUserForBan,
    comparePassword,
    checkCountOfTokens,
    createTokens,
    loginUser,
);

router.delete(API.LOGOUT,
    checkRefreshToken,
    logoutUser
);

router.post(API.SIGNUP,
    toHashPassword,
    createUser,
    createTokens
);

router.post(API.REFRESH,
    checkRefreshToken,
    findUserById('decoded'),
    createTokens
);

router.get(API.AUTHORIZE,
    giveAccessUser,
);

module.exports = router;
