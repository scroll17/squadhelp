import {
    createUserSchema, updateUserSchema
} from '../../utils/yupSchemas/userSchemas';


const validateDataOnCreateUser = async (req, res, next) =>  {
    try {
        req.body = await createUserSchema.validate(req.body, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};

const validateDataOnUpdateUser = async (req, res, next) => {
    const { updateFields } = req.body;
    try {
        req.body.updateFields = await updateUserSchema.validate(updateFields, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};



module.exports = {
    validateDataOnCreateUser,
    validateDataOnUpdateUser
};
