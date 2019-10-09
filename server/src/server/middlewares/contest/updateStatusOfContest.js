const { Contests } = require('../../models');

const {
    CONTEST_STATUS,
    HTTP_CODE: {
        SUCCESS
    }
} = require('../../constants');


const { BadRequest } = require('../../errors/errors');

const isNull = require("lodash/isNull");

module.exports = async (req, res, next) => {
    const { transaction } = req;
    const { contestId, entryRefContestId } = req.body;

    if(isNull(contestId)){
        console.log("--------- isNull(contestId) --------");

        await transaction.rollback();
        return next(new BadRequest());
    }else {
        try{

            const contests = await Contests.findAll({
                where: {
                    contestId: contestId, // UUID
                    status: {
                        $not: CONTEST_STATUS.CLOSED
                    },
                },
                order: [['status', 'DESC']],
                transaction
            });


            if(contests.length === 1){
                if(contests[0].id !== entryRefContestId){
                    console.log("--------- !== entryRefContestI --------");

                    await transaction.rollback();
                    return next(new BadRequest());
                }else{

                    contests[0].status = CONTEST_STATUS.CLOSED;
                    await contests[0].save();
                }
            }else if(contests.length > 1){

                contests[0].status = CONTEST_STATUS.CLOSED;
                contests[1].status = CONTEST_STATUS.OPEN;

               await contests[0].save();
               await contests[1].save();
            }


            await transaction.commit();
            res.status(SUCCESS.CREATED.CODE).send("Contest closed!")

        }catch (err) {
            next(err)
        }
    }

};

