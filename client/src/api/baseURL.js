const IP = "10.2.1.61";
const MY_IP = "192.168.0.105";

const LOCALHOST = "localhost";

export const baseURL = `http://${MY_IP}:3000`;

export const userURL = `${baseURL}/user`;
export const adminURL = `${baseURL}/admin`;
export const contestURL = `${baseURL}/contest`;
export const entriesURL = `${baseURL}/entries`;
export const paymentURL = `${baseURL}/payment`;


export const URL = {
  // API USER
  USER: '/user',
  LOGIN: '/login',
  LOGOUT: "/logout",
  AUTHORIZE: '/authorize',

  ALL_USER: "/alluser",
  ALL_ENTRIES: '/all-entries',

  SIGN_UP: "/signup",
  REFRESH: "/refresh",
  USER_CONTESTS: '/contests',
  USER_ENTRIES: '/entries',

  // API CONTEST
  CREATE: '/create',
  CONTEST: '/contest',
  CONTEST_PRICE: '/price',


  // CONTEST
  CONTESTS: '/contests',
  CONTEST_TYPE: "/contest-type",
  NAME_IDEAS: "/Name-Ideas",

  // ENTRY
  ENTRY: '/entry',

  // USER
  HOME: '/',
  NOT_FOUND: "/notfound",
  ADMIN_PANEL: "/adminpanel",
  MODERATION: '/moderation',

  // DASHBOARD
  DASHBOARD: "/dashboard",

  MY_DASHBOARD: "/my-dashboard",
  MY_ACCOUNT: "/my-account",
  MY_CONTESTS: "/my-contests",
  MY_BALANCE: '/my-balance'
};

export const SEARCH = {
  TYPE: '?type=',
  ID: '?id='
};
