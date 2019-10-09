const express = require('express');

const multer = require('multer');

const {
    createEntry,
    updateEntryById
} = require('../controllers/entriesController');

const updateStatusOfContest = require("../middlewares/contest/updateStatusOfContest");


const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');

const upload = multer({
    storage: createDiskStorageConfig(multer, __dirname, '../../../public/images/tmp/entryFiles')
});


const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 1),
    createEntry
);


router.put(API.ENTRY_ID,
    updateEntryById,
    updateStatusOfContest,
);


module.exports = router;
