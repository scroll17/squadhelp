const express = require('express');
const multer = require('multer');

const {
    createEntry,
    updateEntryById,
    updateEntryToResolve
} = require('../controllers/entriesController');

const {
    validateDataOnUpdateEntry,
    validateDataOnCreateEntry
} = require("../middlewares/validate/validateEntry");

const { increaseUserBalance } = require("../controllers/paymentController");

const addUpdateEntryOptions = require("../middlewares/entries/addUpdateEntryOptions");
const updateStatusOfContest = require("../middlewares/contest/updateStatusOfContest");

const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');

const upload = multer({
    storage: createDiskStorageConfig(multer, __dirname, '../../../public/images/tmp/entryFiles')
});


const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 1),
    validateDataOnCreateEntry,
    createEntry
);


router.put(API.ENTRY_ID,
    validateDataOnUpdateEntry,
    addUpdateEntryOptions,
    updateEntryById,
);

router.put(API.ENTRY_ID,
    updateEntryToResolve,
    updateStatusOfContest,
    increaseUserBalance
);


module.exports = router;
