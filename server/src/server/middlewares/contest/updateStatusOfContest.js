const {Contests} = require('../../models');

const {
    CONTEST_STATUS,
} = require('../../constants');

const size = require("lodash/size");

const transactionRollAndSendBadReq = require("../../utils/transactionRollAndSendBadReq");

module.exports = async (req, res, next) => {
    const { transaction } = req;
    const { updateData: { contestUuid }} = req.body;

    try {
        const contests = await Contests.findAll({
            where: {
                contestId: contestUuid,
                status: {
                    $not: CONTEST_STATUS.CLOSED
                },
            },
            rejectOnEmpty: true,
            order: [['priority', 'ASC']],
            transaction
        });

        if(size(contests) === 0){
            return await transactionRollAndSendBadReq(transaction, next)

        }else{
            const contestClosedIndex = 0;

            contests[contestClosedIndex].status = CONTEST_STATUS.CLOSED;
            await contests[contestClosedIndex].save();

            if (contests.length > 1) {
                const contestOpenIndex = contestClosedIndex + 1;

                contests[contestOpenIndex].status = CONTEST_STATUS.OPEN;
                await contests[contestOpenIndex].save();
            }

            req.body.contestPrice = contests[contestClosedIndex].price;
            next()
        }

    }catch (err) {
        next(err);
    }

};


// const contestClosedIndex = findIndex(contests, (contest) => contest.contestId === contestUuid);
// if(contestClosedIndex < 0){
//     return await transactionRollAndSendBadReq(transaction, next)
// }
//
// contests[contestClosedIndex].status = CONTEST_STATUS.CLOSED;
// await contests[contestClosedIndex].save();
//
// if (contests.length > 1) {
//     const contestOpenIndex = contestClosedIndex + 1;
//
//     console.log("contestOpenIndex", contestOpenIndex);
//
//     contests[contestOpenIndex].status = CONTEST_STATUS.OPEN;
//     await contests[contestOpenIndex].save();
// }
//
//
// console.log("contests", contests);
// console.log("contestClosedIndex", contestClosedIndex);
//
//
// req.body.contestPrice = contests[contestClosedIndex].price;
// next()


