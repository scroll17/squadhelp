import {
    createContestSchema,
    updateContestSchema,
    findContestsSchema
} from '../../utils/yupSchemas/contestSchemas';


const validateDataOnCreateContest = async (req, res, next) =>  {
    const contests = JSON.parse(req.body.formFields);
    try {
        req.body.contests = await createContestSchema.validate(contests, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};

const validateDataOnUpdateContest = async (req, res, next) => {
    const contests = JSON.parse(req.body.updateFields);

    try {
        req.body.updateFields = await updateContestSchema.validate(contests, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};

const validateDataOnGetContest = async (req, res, next) => {
    const searchParams = req.query;
    try {
        req.body.searchParams = await findContestsSchema.validate(searchParams, {stripUnknown: true});
        next();

    } catch (e) {
        next(e);
    }
};

module.exports = {
    validateDataOnCreateContest,
    validateDataOnUpdateContest,
    validateDataOnGetContest
};
