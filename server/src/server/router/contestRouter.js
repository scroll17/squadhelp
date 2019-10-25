const express = require('express');

const multer = require('multer');

const {
    createContest,
    getPriceToContests,
    getContestById,
    updateContest,
    getContestsByParams
} = require('../controllers/contestController');

const {
    validateDataOnCreateContest,
    validateDataOnUpdateContest,
    validateDataOnGetContest
} = require("../middlewares/validate/vaalidateContest");

const pickContestFilter = require("../middlewares/contest/pickContestFilter");

const addFindOptionsToContest = require("../middlewares/contest/addFindOptionsToContest");

const addStatusToContest = require("../middlewares/contest/addStatusToContest");
const addContestExtraContent = require("../middlewares/contest/addContestExtraContent");

const sortContestByPriority = require("../middlewares/contest/sortContestByPriority");

const compareThePriceOfContests = require('../middlewares/contest/compareThePriceOfContests');
const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');


const upload = multer({storage: createDiskStorageConfig(multer, __dirname, '../../../public/images/tmp/contestFiles')});

const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 3),
    validateDataOnCreateContest,
    compareThePriceOfContests,
    sortContestByPriority,
    addStatusToContest,
    createContest
);

router.put(API.UPDATE,
    upload.array('file', 1),
    validateDataOnUpdateContest,
    updateContest,
);

router.get(API.CONTEST_PRICE,
    getPriceToContests,
);

router.get(`${API.CONTESTS}/:id`,
    addContestExtraContent,
    getContestById,
);

router.get(`${API.ALL_CONTESTS}`,
    validateDataOnGetContest,
    pickContestFilter,
    addFindOptionsToContest,
    getContestsByParams
);

module.exports = router;
