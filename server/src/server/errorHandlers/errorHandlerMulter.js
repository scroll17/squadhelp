const multer = require('multer');

module.exports = (err,req,res,next) =>{
    if(err instanceof multer.MulterError){
        console.log(err);
        res.status(500).send('MULTER ERROR');
    }else{
        next(err);
    }
};
