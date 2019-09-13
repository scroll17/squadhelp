const multer = require('multer');
const path = require('path');

module.exports =  (dirname, pathTo) => {
    return  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(dirname, pathTo))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
};
