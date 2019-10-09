const express = require('express');

const multer = require('multer');

const {
    createContest,
    getPriceToContests,
    paymentOfContests,
    getContestById
} = require('../controllers/contestController');


const addStatusToContest = require("../middlewares/contest/addStatusToContest");
const addContestExtraContent = require("../middlewares/contest/addContestExtraContent");

const compareThePriceOfContests = require('../middlewares/contest/compareThePriceOfContests');
const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');


const upload = multer({storage: createDiskStorageConfig(multer, __dirname, '../../../public/images/tmp/contestFiles')});

const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 3),
    compareThePriceOfContests,
    addStatusToContest,
    createContest
);

router.get(API.CONTEST_PRICE,
    getPriceToContests,
);

router.get(`${API.CONTESTS}/:id`,
    addContestExtraContent,
    getContestById,
);

module.exports = router;
