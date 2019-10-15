const {
    ACCESS_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    REFRESH_SECRET,
    TOKEN
}= require('./tokens');

const {
    CONTEST_PRICE,
    CONTEST_TYPE,
    CONTEST_STATUS,
    CONTEST_PRIORITY,
    CONTEST_FIELDS,
    CONTEST_FIELDS_TO_UPDATE
} = require('./contest');

const {
    ENTRIES_STATUS,
    ENTRY_VALIDATION_STATUS ,
    ENTRY_FIELDS
} = require("./entries");

const {
    SOCKET_EVENTS,
    USER_SOCKET_DATA
} = require('./socket');

const {
    TYPE_OF_UPDATE_BALANCE_FOR_USER,
    USER_FIELDS_TO_UPDATE,
    USER_FIELDS
} = require("./user");

const { TYPE_OF_PAYMENT } = require('./payment');
const { URL } = require('./url') ;
const { HTTP_CODE } = require("./http");
const { ABILITY } = require("./ability");
const { ROLES, ROLE } = require('./role');

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

const SOURCE_ID = {
    DECODED: 'decoded',
    PARAMS: 'params',
    PAYLOAD: 'payload'
};

const TYPE_OF_SCOPE = {
    CLEAN_SEARCH: "cleanSearch",
    CLEAN_UPDATE: "cleanUpdate",

    UPDATE: "update",
};

const DEFAULT_MODEL_FIELDS = {
  ID: 'id',
  CREATED_AT: "createdAt",
  UPDATE_AT: "updatedAt"
};

module.exports = {
    PORT,
    SALT_ROUNDS,
    ERROR_MESSAGE,
    SQUAD_HELP_BANK_CARD,
    DEFAULT_MODEL_FIELDS,

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
    CONTEST_FIELDS,
    CONTEST_FIELDS_TO_UPDATE,

    ENTRIES_STATUS,
    ENTRY_VALIDATION_STATUS,
    ENTRY_FIELDS,

    TYPE_OF_SCOPE,
    SOURCE_ID,
    TYPE_OF_UPDATE_BALANCE_FOR_USER,
    USER_FIELDS_TO_UPDATE,
    USER_FIELDS,

    TYPE_OF_PAYMENT
};
