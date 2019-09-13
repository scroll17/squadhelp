const express = require('express');

const multer = require('multer');

const {
    createContest,
    getPriceToContests,
    paymentOfContests,
    getContestById
} = require('../controllers/contestController');


const compareThePriceOfContests = require('../middlewares/contest/compareThePriceOfContests');
const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');

const upload = multer({
    storage: createDiskStorageConfig(__dirname, '../../../public/tmp/contestFiles')
});

const router = express.Router();


router.post(API.CREATE,
    upload.array('files', 3),
    compareThePriceOfContests,
    createContest
);

router.get(API.CONTEST_PRICE,
    getPriceToContests,
);

router.get(`${API.CONTESTS}/:id`,
    getContestById,
);

module.exports = router;
