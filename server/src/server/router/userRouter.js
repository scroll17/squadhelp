const express = require('express');
const multer = require('multer');


const createTokens = require('../middlewares/token/createTokens');

const findUserByEmail  = require('../middlewares/user/findUserByEmail');
const findUserById  = require('../middlewares/user/findUserById');

const comparePassword = require('../middlewares/password/comparePassword');

const checkUserForBan  = require('../middlewares/verification/checkUserForBan');
const checkCountOfTokens = require("../middlewares/token/checkCountOfTokens");
const checkRefreshToken = require('../middlewares/token/checkRefreshToken');

const addUserUpdateOptions = require("../middlewares/user/addUserUpdateOptions");

const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const {
    giveAccessUser,
    createUser,
    logoutUser,
    getUserContests,
    getUserEntries,
    updateUser
} = require('../controllers/userController');

const {
    validateDataOnCreateUser,
    validateDataOnUpdateUser,
} = require('../middlewares/validate/validateUser');

const {
    URL: {
        API
    },
    USER_FIELDS: {
        AVATAR
    },
    UPDATE_INFORMATION,
    SOURCE_ID
} = require('../constants');

const upload = multer({storage: createDiskStorageConfig(multer, __dirname, '../../../public/images/user/avatar')});

const router = express.Router();

router.post(API.LOGIN,
    findUserByEmail,
    checkUserForBan,
    comparePassword,
    checkCountOfTokens,
    createTokens,
);

router.delete(API.LOGOUT,
    checkRefreshToken,
    logoutUser
);

router.post(API.SIGNUP,
    validateDataOnCreateUser,
    createUser,
    createTokens
);

router.post(API.REFRESH,
    checkRefreshToken,
    findUserById(SOURCE_ID.DECODED),
    createTokens
);

router.put(API.UPDATE,
    validateDataOnUpdateUser,
    addUserUpdateOptions(UPDATE_INFORMATION),
    updateUser,
);

router.put(`${API.UPDATE}${AVATAR}`,
    upload.array('file', 1),
    addUserUpdateOptions(AVATAR),
    updateUser,
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
