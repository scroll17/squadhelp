const {
    CONTEST_STATUS
} = require('../../constants');

module.exports = (req, res, next) => {
    const { contests } = req.body;

    contests.forEach( (contest, item) => {
        if(item === 0){
            contest.status = CONTEST_STATUS.OPEN
        }else{
            contest.status = CONTEST_STATUS.AWAITING
        }
    });

    next()
};
