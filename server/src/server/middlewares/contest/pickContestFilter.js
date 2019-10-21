module.exports = (req, res, next) => {
    const {
        body: {
            searchParams
        },
    } = req;

    if(searchParams.price){
        req.body.searchParams.price = {
            $gte: searchParams.price
        };
    }

    next();
};
