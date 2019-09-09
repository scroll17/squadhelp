const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 8;

const ACCESS_SECRET = "Keep it simple, stupid";
const REFRESH_SECRET = "xzzzzzzzzz";

const EXPIRES_IN_ACCESS = '30min'; //TODO
const EXPIRES_IN_REFRESH = '15d';

const SQUAD_HELP_BANK_CARD = {
    number: '0000000000000001',
    expiry: '01/25',
    cvc: '120',
};

const ROLE = {
    ADMIN: "admin",
    BUYER: "buyer",
    CREATIVE: "creative",
};
const ROLES = ["admin", "buyer", "creative"];

const TOKEN = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
  MAX_NUMBER_OF_REFRESH_TOKEN: 3
};

const CONTEST_TYPE = {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
};

const CONTEST_PRICE = new Map([
    [CONTEST_TYPE.NAME, 33],
    [CONTEST_TYPE.LOGO, 33],
    [CONTEST_TYPE.TAGLINE, 33],
]);

const URL = {
    API: {
        AUTHORIZE: '/authorize',
        SIGNUP: '/signup',
        LOGIN: '/login',
        LOGOUT: '/logout',
        ALL_USER: '/alluser',
        USER_ID: '/user/:id',
        REFRESH: '/refresh',

        CONTEST: '/contest',
        CONTEST_PRICE: '/contest/price',

        PAYMENT: '/payment'
    },
};

const ABILITY = {
    SUBJECT: {
        USER: "User",
        CONTEST: "Contest",
        ALL: "all",
    },
    ACTIONS:{
        CREATE: "create",
        READ: "read",
        UPDATE: "update",
        DELETE: "delete",
        MANAGE: "manage", // управлять
        CRUD: "crud",
    }
};

const HTTP_CODE = {
    SUCCESS: {
        OK: {
            CODE: 200,
            TEXT: 'OK',
        },
        CREATED:{
            CODE: 201,
            TEXT: 'Created',
        },
        ACCEPTED: {
            CODE: 202,
            TEXT: 'Accepted',
        }
    },
    SERVER_ERROR:{
        INTERNAL_SERVER_ERROR:{
            CODE: 500,
            TEXT: 'Internal Server Error'
        },
        UNAUTHORIZED:{
            CODE: 401,
            TEXT: 'Unauthorized'
        },
        NOT_FOUND:{
            CODE: 404,
            TEXT: 'Not found'
        },
        REMOVED:{
            CODE: 410,
            TEXT: 'Removed'
        },
        FORBIDDEN:{
            CODE: 403,
            TEXT: 'Forbidden'
        },
        CONFLICT:{
            CODE: 409,
            TEXT: 'Conflict'
        },
        BAD_REQUEST:{
            CODE: 400,
            TEXT: 'Bad Request'
        },
        AUTHENTICATION_TIMEOUT:{
            CODE: 419,
            TEXT: 'AuthenticationTimeout'
        }
    }
};

const ERROR_MESSAGE = {
    YOUR_BANNED: 'Your banned !'
};

const SOCKET_EVENTS = {
    ON: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',

        USER_CONNECTED: 'user connected',

        NEW_MESSAGE: 'new message',

        START_CONVERSATION: "start conversation",

        JOIN_TO_ROOM: 'join to room',
        LEAVE_THE_ROOM: "leave the room",

        USER_STARTS_TYPING: 'user starts typing',
        USER_STOP_TYPING: 'user stop typing',

        FIND_USERS: 'find users',
    },
    EMIT: {
        SHOW_CONVERSATION: 'show conversations',
        NEW_CONVERSATION_SAVE: "save new conversation",

        USER_STARTS_TYPING: 'user starts typing',
        USER_STOP_TYPING: 'user stop typing',

        JOIN_TO_ROOM: 'join to room',

        OLD_MESSAGES: 'load old messages',
        NEW_MESSAGE: 'new message',

        FOUND_USERS: 'found users',
    }

};


const USER_SOCKET_DATA = new Map();

module.exports = {
    PORT,

    SALT_ROUNDS,

    ACCESS_SECRET,
    REFRESH_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    TOKEN,

    ROLE,
    ROLES,

    URL,

    ABILITY,

    HTTP_CODE,

    CONTEST_TYPE,
    CONTEST_PRICE,

    ERROR_MESSAGE,

    SQUAD_HELP_BANK_CARD,

    SOCKET_EVENTS,

    USER_SOCKET_DATA,
};

