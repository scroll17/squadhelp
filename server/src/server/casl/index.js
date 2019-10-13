const { AbilityBuilder, Ability } = require('@casl/ability');

const {
    ROLE,
    ABILITY: {
        SUBJECT,
        ACTIONS,
        FIELD_TO_UPDATE
    }
} = require('../constants');

module.exports.defineAbilitiesFor = (role, user) => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    switch (role) {
        case ROLE.ADMIN: {
            can(ACTIONS.CRUD, SUBJECT.USER);

            can(ACTIONS.READ, SUBJECT.ALL);

            can(ACTIONS.UPDATE, SUBJECT.ENTRIES);
            cannot(ACTIONS.UPDATE, SUBJECT.USER, { role: ROLE.ADMIN }).because('Dont give');
            break;
        }
        case ROLE.BUYER:{
            can(ACTIONS.CREATE, SUBJECT.CONTEST);

            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER, { isBanned: true }).because('You have bun !');

            can(ACTIONS.UPDATE, SUBJECT.CONTEST);
            can(ACTIONS.UPDATE, SUBJECT.ENTRIES);

            can(ACTIONS.PAY, SUBJECT.BANKS);
            break;
        }
        case ROLE.CREATIVE:{
            can(ACTIONS.CREATE, SUBJECT.ENTRIES);

            can(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.USER,  { isBanned: true }).because('You have bun !');

            can(ACTIONS.UPDATE, SUBJECT.ENTRIES);

            can(ACTIONS.CASH_OUT, SUBJECT.BANKS);
            break;
        }
        case null:
        default:
            can(ACTIONS.CREATE, SUBJECT.USER);

            cannot(ACTIONS.READ, SUBJECT.USER);
            cannot(ACTIONS.READ, SUBJECT.CONTEST);
            cannot(ACTIONS.READ, SUBJECT.ENTRIES);

            cannot(ACTIONS.UPDATE, SUBJECT.USER);
    }


    return new Ability(rules)
};
