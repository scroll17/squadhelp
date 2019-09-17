const { AbilityBuilder, Ability } = require('@casl/ability');

const { ROLE, ABILITY: {SUBJECT, ACTIONS, FIELD_TO_UPDATE} } = require('../constants');

module.exports.defineAbilitiesFor = (role, user) => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    switch (role) {
        case ROLE.ADMIN: {
            can(ACTIONS.CRUD, SUBJECT.USER);

            can(ACTIONS.READ, SUBJECT.ALL);
            can(ACTIONS.READ, SUBJECT.CONTEST);

            can(ACTIONS.UPDATE, SUBJECT.ENTRIES);
            cannot(ACTIONS.UPDATE, SUBJECT.USER, { role: ROLE.ADMIN }).because('Admin lox');
            break;
        }
        case ROLE.BUYER:{
            can(ACTIONS.READ, SUBJECT.USER);
            can(ACTIONS.READ, SUBJECT.CONTEST);
            cannot(ACTIONS.READ, SUBJECT.USER, { isBanned: true }).because('You lox, Zabanen !');

            can(ACTIONS.UPDATE, SUBJECT.CONTEST);
            can(ACTIONS.UPDATE, SUBJECT.ENTRIES);
            break;
        }
        case ROLE.CREATIVE:{
            can(ACTIONS.CREATE, SUBJECT.ENTRIES);

            can(ACTIONS.READ, SUBJECT.USER);
            can(ACTIONS.READ, SUBJECT.CONTEST);
            cannot(ACTIONS.READ, SUBJECT.USER,  { isBanned: true }).because('You lox, Zabanen !');
            break;
        }
        case null:
        default:
            can(ACTIONS.CREATE, SUBJECT.USER);
    }


    return new Ability(rules)
};
