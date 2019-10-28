import config from '../boot/config';
import { baseURL } from "../api/baseURL";

import {
    CHAT_FIELDS,
    STAGE_OF_CHAT,
    TYPE_OF_MESSAGE
} from './chat'

import {
    CONTEST,
    FORM,
    TYPE_FIELD,
    ACTIVE_CONTEST_FORM_FIELDS
} from './form'

import { ERROR, SUCCESS_CODE } from './http'
import { DISPLAY, VIEW } from './viewAndDisplay'

import {
    CONTEST_USER_FILE,
    ENTRY_USER_FILE,
    STATUS_OF_CONTEST_AND_ENTRY ,
    CONTEST_STATUS,
    TYPE_UPDATE_ENTRY,
    CONTEST_REDUCER_VAL,
    CONTEST_FIELDS,
    CONTEST_FIELDS_TO_UPDATE
} from './dashboard'

import { ICON } from './icon'

const STORE = config();

const ROLE = {
  CREATIVE: 'creative',
  BUYER: 'buyer',
  ADMIN: 'admin',
};
const TOKEN = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    AUTHORIZATION: "Authorization",
    BEARER: "Bearer ",
};
const HEX_COLOR = {
    WHITE: "#f9f9f9",
    BLUE: "#28d2d0",
    GRAY_20: '#333333',
    WHITE_SMOKE: "#f5f5f5",
    GREEN: '#008000',
    SOFT_GREEN: '#28d2d0',
    ORANGE: '#ff7d28',
};

const USER_AVATAR = `${baseURL}/images/user/avatar/`;

const SQUAD_HELP_LOGO = "https://www.squadhelp.com/images/squadhelp-logo-color.jpg";

const USER_DATA_FIELDS = {
    EMAIL: "email",
    IS_BANNED: "isBanned",
    AVATAR: "avatar",
    BALANCE: "balance"
};

const USER_FIELDS = {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    DISPLAY_NAME: "displayName",
    AVATAR: "avatar",
    EMAIL: "email",
    PASSWORD: "password",
    BALANCE: "balance",
    IS_BANNED: 'isBanned',
};

export  {
    STORE,
    SUCCESS_CODE,
    ERROR,
    ROLE,
    TOKEN,
    CONTEST,
    VIEW,
    DISPLAY,
    ICON,
    HEX_COLOR,
    FORM,
    TYPE_FIELD,
    CHAT_FIELDS,
    STAGE_OF_CHAT,
    USER_AVATAR,
    CONTEST_USER_FILE,
    ENTRY_USER_FILE,
    STATUS_OF_CONTEST_AND_ENTRY,
    CONTEST_STATUS,
    TYPE_UPDATE_ENTRY,
    TYPE_OF_MESSAGE,
    USER_DATA_FIELDS,
    SQUAD_HELP_LOGO,
    CONTEST_REDUCER_VAL,
    ACTIVE_CONTEST_FORM_FIELDS,
    USER_FIELDS,
    CONTEST_FIELDS,
    CONTEST_FIELDS_TO_UPDATE
}
