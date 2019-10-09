const {
    CONTEST_PRIORITY,
    CONTEST_STATUS
} = require('../../constants');

module.exports = (req, res, next) => {
    const { contests } = req.body;

    contests.forEach( (contest, item) => {
        contest.priority = CONTEST_PRIORITY.get(contest.contestType);

        if(item > 0 ){
            contest.status = CONTEST_STATUS.AWAITING
        }else{
            contest.status = CONTEST_STATUS.OPEN
        }
    });

    next()
};
