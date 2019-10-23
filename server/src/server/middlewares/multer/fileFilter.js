const { BadRequest } = require("../../errors/errors");

const { MIME_TYPE_USER_AVATAR } = require("../../constants");

module.exports =  (req, file, cb) => {

    if(MIME_TYPE_USER_AVATAR[file.mimetype]){
        return  cb(null, true);
    }else {

        req.fileValidationError = new BadRequest("Only image !");
        return cb(null, false);
    }

};
