module.exports = (req, res, next) => {

    req.body.contests = JSON.parse(req.body.formFields);

    next();
};