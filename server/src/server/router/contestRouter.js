const express = require('express');

const multer = require('multer');
const path = require('path');

const {
    createContest,
    getPriceToContests,
    paymentOfContests,
    getContestById
} = require('../controllers/contestController');


const compareThePriceOfContests = require('../middlewares/contest/compareThePriceOfContests');
//const createDiskStorageConfig = require('../middlewares/multer/createDiskStorageConfig');

const { URL: { API } } = require('../constants');
//
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, path.join(__dirname, '../../../public/tmp/contestFiles'))
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.originalname);
//         }
//     })
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/images/tmp/contestFiles'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

const router = express.Router();


router.post(API.CREATE,
    upload.array('file', 3),
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
