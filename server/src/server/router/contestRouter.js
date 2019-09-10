const express = require('express');

const path = require('path');
const multer = require('multer');

const {
 createContest,
 sendPriceToContests,
 paymentOfContests,
} = require('../controllers/contestController');


const parseContestFormData = require('../middlewares/contest/parseContestFormData');
const compareThePriceOfContests = require('../middlewares/contest/compareThePriceOfContests');

const { URL: { API } } = require('../constants');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../tmp/taskFiles'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


const router = express.Router();


router.post(API.CONTEST,
    upload.array('files', 3),
    parseContestFormData,
    compareThePriceOfContests,
    createContest
);

router.get(API.CONTEST_PRICE,
    sendPriceToContests,
);

module.exports = router;
