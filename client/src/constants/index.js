import config from '../boot/config';

const STORE = config();

const SUCCESS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202
};
const ERROR = {
    Forbidden: 403,
    NotFound: 404,
    Unauthorized: 401,
    AuthenticationTimeout: 419
};
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

const CONTEST = {
    SELECT: "select",
    NAME: "name",
    TAGLINE: "tagline",
    LOGO: "logo",
    BANKS: "banks",
};

const VIEW = {
    DESKTOP: "desktop",
    SMARTPHONE: "smartphone"
};

const DISPLAY = {
  BLOCK: "block",
  NONE: "none"
};

const HEX_COLOR = {
  WHITE: "#f9f9f9",
  BLUE: "#28d2d0",
  GRAY_20: '#333333',
  WHITE_SMOKE: "#f5f5f5",
};

const FORM = {
  SIGN_UP: 'signUp',
  LOGIN: 'login',
  CHAT: 'chat'
};

const TYPE_FIELD = {
    SELECT: "select",
    TEXTAREA: "textarea",
    INPUT: "input",
    INPUT_FILE: "file"
};


const CHAT_FIELDS = {
    FIND: 'find',
    MESSAGE: 'message'
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
}
