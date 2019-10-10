const {
    CONTEST_PRIORITY,
} = require('../../constants');

module.exports = (req, res, next) => {
    const { contests } = req.body;

    contests.forEach( contest => {
        contest.priority = CONTEST_PRIORITY.get(contest.contestType);
    });

    contests.sort((prevContest, nextContest) => {
        return prevContest.priority - nextContest.priority
    });

    next()
};