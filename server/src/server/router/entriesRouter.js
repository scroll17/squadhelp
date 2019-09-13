const express = require('express');

const multer = require('multer');

const {
    createEntry,
} = require('../controllers/entriesController');


const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');


const upload = multer({
    storage: createDiskStorageConfig(__dirname, '../../../public/tmp/entriesFiles')
});


const router = express.Router();


router.post(API.CREATE,
    upload.array('files', 1),
    createEntry
);


module.exports = router;
