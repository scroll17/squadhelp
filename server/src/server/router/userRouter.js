const express = require('express');

const createTokens = require('../middlewares/token/createTokens');

const findUserByEmail  = require('../middlewares/user/findUserByEmail');
const findUserById  = require('../middlewares/user/findUserById');

const comparePassword = require('../middlewares/password/comparePassword');

const checkUserForBan  = require('../middlewares/verification/checkUserForBan');
const checkCountOfTokens = require("../middlewares/token/checkCountOfTokens");
const checkRefreshToken = require('../middlewares/token/checkRefreshToken');

const {
    giveAccessUser,
    createUser,
    loginUser,
    logoutUser,
    getUserContests,
    getUserEntries
} = require('../controllers/userController');

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

router.get(API.USER_CONTESTS,
    getUserContests
);

router.get(API.USER_ENTRIES,
    getUserEntries
);

module.exports = router;
