const express = require('express');

const {
    getAllUsers,
    updateUserById
} = require('../controllers/userController');

const findUserById  = require('../middlewares/user/findUserById');

const { URL: { API } } = require('../utils/consts');


const router = express.Router();

router.get(API.ALL_USER,
    getAllUsers
);

router.put(API.USER_ID,
    findUserById('params'),
    updateUserById,
);

module.exports = router;
