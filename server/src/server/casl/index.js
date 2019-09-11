// https://github.com/stalniy/casl-express-example
// https://habr.com/ru/post/414951/

const { AbilityBuilder, Ability } = require('@casl/ability');

const { ROLE, ABILITY: {SUBJECT, ACTIONS} } = require('../constants');

module.exports.defineAbilitiesFor = (role, user) => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    switch (role) {
        case ROLE.ADMIN: {
            can(ACTIONS.CRUD, SUBJECT.USER);
            can(ACTIONS.READ, SUBJECT.ALL);
            can(ACTIONS.READ, SUBJECT.CONTEST);
            cannot(ACTIONS.UPDATE, SUBJECT.USER, { role: ROLE.ADMIN }).because('Admin lox');
            break;
        }
        case ROLE.BUYER:{
            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER, { isBanned: true }).because('You lox, Zabanen !');
            break;
        }
        case ROLE.CREATIVE:{
            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER,  { isBanned: true }).because('You lox, Zabanen !');
            break;
        }
        case null:
        default:
            can(ACTIONS.CREATE, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.CONTEST);
    }


    return new Ability(rules)
};
