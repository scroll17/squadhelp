const {
    ACCESS_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    REFRESH_SECRET,
    TOKEN
}= require('./tokens');

const { URL } = require('./url') ;
const { HTTP_CODE } = require("./http");
const {
    SOCKET_EVENTS,
    USER_SOCKET_DATA
} = require('./socket');
const { ROLES, ROLE } = require('./role');
const {
    CONTEST_PRICE,
    CONTEST_TYPE,
    CONTEST_STATUS,
    CONTEST_PRIORITY
} = require('./contest');
const { ABILITY } = require("./ability");
const {
    ENTRIES_STATUS,
    ENTRY_VALIDATION_STATUS ,
    TYPE_UPDATE_ENTRY
} = require("./entries");

const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 8;

const SQUAD_HELP_BANK_CARD = {
    number: '0000000000000001',
    expiry: '01/25',
    cvc: '120',
};

const ERROR_MESSAGE = {
    YOUR_BANNED: 'Your banned !'
};


const TYPE_OF_SCOPE = {
    CONTEST: {
        CLEAN_SEARCH: "cleanSearch"
    }
};

module.exports = {
    PORT,
    SALT_ROUNDS,
    ERROR_MESSAGE,
    SQUAD_HELP_BANK_CARD,

    ACCESS_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    REFRESH_SECRET,
    TOKEN,

    URL,
    HTTP_CODE,

    SOCKET_EVENTS,
    USER_SOCKET_DATA,

    ROLE,
    ROLES,
    ABILITY,

    CONTEST_PRICE,
    CONTEST_TYPE,
    CONTEST_STATUS,
    CONTEST_PRIORITY,

    ENTRIES_STATUS,
    ENTRY_VALIDATION_STATUS,
    TYPE_UPDATE_ENTRY,

    TYPE_OF_SCOPE
};
