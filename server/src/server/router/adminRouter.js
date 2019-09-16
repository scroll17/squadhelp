const express = require('express');

const {
    getAllUsers,
    getAllEntries,
    updateUserById,
    updateEntryById
} = require('../controllers/adminController');

const findUserById  = require('../middlewares/user/findUserById');

const { URL: { API } } = require('../constants');


const router = express.Router();

router.get(API.ALL_USER,
    getAllUsers
);
router.put(API.USER_ID,
    findUserById('params'),
    updateUserById,
);

router.get(API.ALL_ENTRIES,
    getAllEntries
);
router.put(API.ENTRY_ID,
    updateEntryById,
);

module.exports = router;
