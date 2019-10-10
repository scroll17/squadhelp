const {Contests} = require('../../models');

const {
    CONTEST_STATUS,
    HTTP_CODE: {
        SUCCESS
    }
} = require('../../constants');


module.exports = async (req, res, next) => {
    const {transaction} = req;
    const { contestUuid } = req.body;

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

        contests[0].status = CONTEST_STATUS.CLOSED;
        await contests[0].save();

        if (contests.length > 1) {
            contests[1].status = CONTEST_STATUS.OPEN;
            await contests[1].save();
        }

        await transaction.commit();
        res.status(SUCCESS.CREATED.CODE).send("Contest closed!")

    }catch (err) {
        next(err);
    }

};



