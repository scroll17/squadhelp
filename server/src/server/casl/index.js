// https://github.com/stalniy/casl-express-example
// https://habr.com/ru/post/414951/

const { AbilityBuilder, Ability } = require('@casl/ability');

const { ROLE, ABILITY: {SUBJECT, ACTIONS} } = require('../utils/consts');

module.exports.defineAbilitiesFor = (role, user) => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    switch (role) {
        case null:{
            can(ACTIONS.CREATE, SUBJECT.USER);
            break;
        }
        case ROLE.ADMIN: {
            can(ACTIONS.CRUD, SUBJECT.USER);
            can(ACTIONS.READ, SUBJECT.ALL);
            cannot(ACTIONS.UPDATE, SUBJECT.USER, { role: ROLE.ADMIN }).because('Admin lox');
            break;
        }
        case ROLE.BUYER:{
            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER, {isBanned: true}).because('You lox, Zabanen !');
            break;
        }
        case ROLE.CREATIVE:{
            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER,  {isBanned: true}).because('You lox, Zabanen !');
            break;
        }
        default:
            console.log('------- default -------');
    }


    return new Ability(rules)
};
