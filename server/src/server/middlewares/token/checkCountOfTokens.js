const { RefreshToken } = require('../../models');
const { TOKEN: MAX_NUMBER_OF_REFRESH_TOKEN } = require('../../constants');

module.exports = async (req, res, next) => {
    const { user } = req.body;
    try{

        const options = {
            where: {
                userId: user.id
            }
        };


        const count = await RefreshToken.count(options);

        if(count >= MAX_NUMBER_OF_REFRESH_TOKEN){
            await RefreshToken.destroy(options);
        }

        next();
    }catch (err) {
        next(err)
    }
};
