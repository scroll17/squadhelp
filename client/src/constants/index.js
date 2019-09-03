import config from '../boot/config';

export const STORE = config();

export const SUCCESS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202
};

export const ERROR = {
    Forbidden: 403,
    NotFound: 404,
    Unauthorized: 401,
    AuthenticationTimeout: 419
};

export const ROLE = {
  CREATIVE: 'creative',
  BUYER: 'buyer',
  ADMIN: 'admin',
};

export const TOKEN = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    AUTHORIZATION: "Authorization",
    BEARER: "Bearer ",
};

export const CONTEST = {
    SELECT: "select",
    NAME: "name",
    TAGLINE: "tagline",
    LOGO: "logo",
    BANKS: "banks",
};

export const VIEW = {
    DESKTOP: "desktop",
    SMARTPHONE: "smartphone"
};

export const DISPLAY = {
  BLOCK: "block",
  NONE: "none"
};

export const HEX_COLOR = {
  WHITE: "#f9f9f9",
  BLUE: "#28d2d0",
  GRAY_20: '#333333',
  WHITE_SMOKE: "#f5f5f5",
};

export const FORM = {
  SIGN_UP: 'signUp',
  LOGIN: 'login'
};

export const TYPE_FIELD = {
    SELECT: "select",
    TEXTAREA: "textarea",
    INPUT: "input",
    INPUT_FILE: "file"
};

export const SOCKET_EVENTS = {

};

export const FIELDS_TO_SEND = [
    "type",
    "name",
    "typeOfVenture",
    "whatVentureDoes",
    "targetCustomers",
    "style",
    "description",
    "userId"
];
