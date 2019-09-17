import config from '../boot/config';
import { baseURL } from "../api/baseURL";

import { CHAT_FIELDS, STAGE_OF_CHAT } from './chat'
import { CONTEST, FORM, TYPE_FIELD } from './form'
import { ERROR, SUCCESS_CODE } from './http'
import { DISPLAY, VIEW } from './viewAndDisplay'

import {
    CONTEST_USER_FILE,
    ENTRY_USER_FILE,
    STATUS_OF_CONTEST_AND_ENTRY ,
    CONTEST_STATUS,
    TYPE_UPDATE_ENTRY
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
    ORANGE: '#ff7d28',
};

const USER_AVATAR = `${baseURL}/images/user/avatar/`;

const REACT_ROUTER_TYPE = {
    LINK: 'Link'
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
    REACT_ROUTER_TYPE,
    CONTEST_USER_FILE,
    ENTRY_USER_FILE,
    STATUS_OF_CONTEST_AND_ENTRY,
    CONTEST_STATUS,
    TYPE_UPDATE_ENTRY,
}
