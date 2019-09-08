const { User } = require('../../server/models/index');

module.exports = (id) => {
    return User.findByPk(id, {
        attributes: {
            exclude: ['firstName','lastName','password','role','isBanned','createdAt','updatedAt']
        },
        raw: true
    });
}