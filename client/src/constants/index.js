import config from '../boot/config';

import { CHAT_FIELDS, STAGE_OF_CHAT } from './chat'
import { CONTEST, FORM, TYPE_FIELD } from './form'
import { ERROR, SUCCESS_CODE } from './http'
import { DISPLAY, VIEW } from './viewAndDisplay'

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
    HEX_COLOR,
    FORM,
    TYPE_FIELD,
    CHAT_FIELDS,
    STAGE_OF_CHAT,
}
