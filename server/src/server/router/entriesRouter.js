const express = require('express');

const multer = require('multer');
const path = require('path');

const {
    createEntry,
} = require('../controllers/entriesController');


//const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/images/tmp/entryFiles'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 1),
    createEntry
);


module.exports = router;
