import { ACCESS_SECRET, EXPIRES_IN_ACCESS, EXPIRES_IN_REFRESH, REFRESH_SECRET, TOKEN } from './tokens'
import { URL } from './url'
import { HTTP_CODE } from "./http";
import { SOCKET_EVENTS, USER_SOCKET_DATA } from './socket'
import { ROLES, ROLE } from './role'
import { CONTEST_PRICE, CONTEST_TYPE} from './contest'
import { ABILITY } from "./ability";

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


module.exports = {
    PORT,

    ACCESS_SECRET,
    EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH,
    REFRESH_SECRET,
    TOKEN,
    SALT_ROUNDS,


    URL,
    HTTP_CODE,
    ERROR_MESSAGE,

    SOCKET_EVENTS,
    USER_SOCKET_DATA,

    ROLE,
    ROLES,
    ABILITY,

    CONTEST_PRICE,
    CONTEST_TYPE,
    SQUAD_HELP_BANK_CARD,

}